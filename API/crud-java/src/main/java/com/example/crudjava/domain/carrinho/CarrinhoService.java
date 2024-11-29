package com.example.crudjava.domain.carrinho;

import com.example.crudjava.domain.estoque.Estoque;
import com.example.crudjava.domain.funcionario.Funcionario;
import com.example.crudjava.domain.produto.Produto;
import com.example.crudjava.infra.exception.ValidacaoException;
import com.example.crudjava.repository.CarrinhoRepository;
import com.example.crudjava.repository.EstoqueRepository;
import com.example.crudjava.repository.FuncionarioRepository;
import com.example.crudjava.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    @Autowired
    private ProdutoRepository produtoRepository;
    @Autowired
    private EstoqueRepository estoqueRepository;

    public List<DadosListagemCarrinho> addNoCarrinho(List<DadosCarrinho> dadosList) {
        Long funcionarioId = null;
        Boolean codEditVenda = null;
        for (DadosCarrinho dados : dadosList) {

            if (dados.quantidade() == null) {
                throw new ValidacaoException("O campo quantidade é obrigatório!");
            }

            Funcionario funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.funcionarioId());
            Produto produto = produtoRepository.getReferenceByIdAndAtivoTrue(dados.produtoId());

            if (produto == null || funcionario == null) {
                throw new ValidacaoException("Funcionário ou Produto inexistentes!");
            }

            if (funcionarioId == null) funcionarioId = dados.funcionarioId();
            if (codEditVenda == null) codEditVenda = dados.codEditVenda();

            Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(dados.produtoId());

            estoqueProduto.atualizarQuantidade(dados.quantidade(), false);

            Carrinho carrinho = new Carrinho(null, funcionario, produto, dados.quantidade(), dados.codEditVenda());
            carrinhoRepository.save(carrinho);
        }

        if (funcionarioId != null) {
            return carrinhoRepository.findAllByFuncionarioIdAndCodEditVenda(funcionarioId, codEditVenda).stream().map(DadosListagemCarrinho::new).toList();
        }
        return null;
    }

    public List<DadosListagemCarrinho> removerItemDoCarrinho(List<DadosCarrinho> dadosList) {
        Long funcionarioId = null;
        Boolean codEditVenda = null;
        for (DadosCarrinho dados : dadosList) {
            List<Carrinho> itemsCarrinho = carrinhoRepository.findAllByFuncionarioIdAndProdutoIdAndCodEditVenda(dados.funcionarioId(), dados.produtoId(), dados.codEditVenda());
            Integer quantidadeTotalItems = 0;
            if (itemsCarrinho.isEmpty()) throw new ValidacaoException("item não está no carrinho");
            else {
                for (Carrinho itemCarrinho : itemsCarrinho) {
                    quantidadeTotalItems += itemCarrinho.getQuantidade();
                }
            }
            if (funcionarioId == null) funcionarioId = dados.funcionarioId();
            if (codEditVenda == null) codEditVenda = dados.codEditVenda();

            Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(dados.produtoId());

            if (dados.quantidade() > quantidadeTotalItems) {
                throw new ValidacaoException("Essa quantidade é superior a que está no carrinho!");
            } else if (quantidadeTotalItems.equals(dados.quantidade())) {
                carrinhoRepository.deleteAllByFuncionarioIdAndProdutoIdAndCodEditVenda(dados.funcionarioId(), dados.produtoId(), dados.codEditVenda());
            } else {
                quantidadeTotalItems = dados.quantidade();
                for (Carrinho itemCarrinho : itemsCarrinho) {
                    if (quantidadeTotalItems > 0) {
                        quantidadeTotalItems -= itemCarrinho.getQuantidade();
                        if (quantidadeTotalItems >= 0) {
                            carrinhoRepository.delete(itemCarrinho);
                        } else {
                            itemCarrinho.setQuantidade(Math.abs(quantidadeTotalItems));
                        }
                    }
                }
            }

            estoqueProduto.atualizarQuantidade(dados.quantidade(), true);
        }

        if (funcionarioId != null) {
            return listarCarrinho(funcionarioId, codEditVenda);
        }
        return null;
    }

    public void limparCarrinho(Long funcionarioId, Boolean codEditVenda, boolean reporEstoque) {

        List<Carrinho> listaItemsCarrinho = carrinhoRepository.findAllByFuncionarioIdAndCodEditVenda(funcionarioId, codEditVenda);

        if (!listaItemsCarrinho.isEmpty()) {
            listaItemsCarrinho.forEach(itemCarrinho -> {
                if (reporEstoque) {
                    Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(itemCarrinho.getProduto().getId());
                    estoqueProduto.atualizarQuantidade(itemCarrinho.getQuantidade(), true);
                }

                carrinhoRepository.delete(itemCarrinho);
            });
        } else {
            throw new ValidacaoException("Carrinho já está vazio!");
        }
    }

    public List<DadosListagemCarrinho> listarCarrinho(Long id, Boolean codEditVenda) {
        List<Carrinho> listCarrinho = carrinhoRepository.findAllByFuncionarioIdAndCodEditVenda(id, codEditVenda);
        List<DadosListagemCarrinho> listItemsCarrinho = new ArrayList<>();

        if (!listCarrinho.isEmpty()) {
            for (Carrinho itemCarrinho : listCarrinho) {

                DadosListagemCarrinho itemExistente = listItemsCarrinho.stream().filter(dados -> dados.produto().id().equals(itemCarrinho.getProduto().getId())).findFirst().orElse(null);

                if (itemExistente == null) {
                    listItemsCarrinho.add(new DadosListagemCarrinho(itemCarrinho));
                } else {
                    listItemsCarrinho.remove(itemExistente);
                    listItemsCarrinho.add(new DadosListagemCarrinho(itemCarrinho, itemExistente.quantidade() + itemCarrinho.getQuantidade()));
                }
            }
        }


        return listItemsCarrinho;
    }

    public List<DadosListagemCarrinho> listarCarrinho(List<Carrinho> listCarrinho) {
        List<DadosListagemCarrinho> listItemsCarrinho = new ArrayList<>();

        if (!listCarrinho.isEmpty()) {
            for (Carrinho itemCarrinho : listCarrinho) {

                DadosListagemCarrinho itemExistente = listItemsCarrinho.stream().filter(dados -> dados.produto().id().equals(itemCarrinho.getProduto().getId())).findFirst().orElse(null);

                if (itemExistente == null) {
                    listItemsCarrinho.add(new DadosListagemCarrinho(itemCarrinho, itemCarrinho.getQuantidade()));
                } else {
                    listItemsCarrinho.remove(itemExistente);
                    listItemsCarrinho.add(new DadosListagemCarrinho(itemCarrinho, itemExistente.quantidade() + itemCarrinho.getQuantidade()));
                }
            }
        }


        return listItemsCarrinho;
    }

    public BigDecimal calcularValorItems(List<Carrinho> listaItemsCarrinho) {
        BigDecimal valorTotal = BigDecimal.ZERO;

        for (Carrinho itemCarrinho : listaItemsCarrinho) {
            valorTotal = valorTotal.add(itemCarrinho.getProduto().getValor().multiply(BigDecimal.valueOf(itemCarrinho.getQuantidade())));
        }

        return valorTotal;
    }

}
