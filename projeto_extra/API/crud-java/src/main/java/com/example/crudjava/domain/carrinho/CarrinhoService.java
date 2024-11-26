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

            Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(dados.produtoId());

            estoqueProduto.atualizarQuantidade(dados.quantidade(), false);

            Carrinho carrinho = new Carrinho(null, funcionario, produto, dados.quantidade());
            carrinhoRepository.save(carrinho);
        }

        if (funcionarioId != null) {
            return carrinhoRepository.findAllByFuncionarioId(funcionarioId).stream().map(DadosListagemCarrinho::new).toList();
        }
        return null;
    }

    public List<DadosListagemCarrinho> removerItemDoCarrinho(List<DadosCarrinho> dadosList) {
        Long funcionarioId = null;
        for (DadosCarrinho dados : dadosList) {
            List<Carrinho> itemsCarrinho = carrinhoRepository.findAllByFuncionarioIdAndProdutoId(dados.funcionarioId(), dados.produtoId());
            Integer quantidadeTotalItems = 0;
            if (itemsCarrinho.isEmpty()) throw new ValidacaoException("item não está no carrinho");
            else {
                for (Carrinho itemCarrinho : itemsCarrinho) {
                    quantidadeTotalItems += itemCarrinho.getQuantidade();
                }
            }
            if (funcionarioId == null) funcionarioId = dados.funcionarioId();

            Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(dados.produtoId());

            if (dados.quantidade() > quantidadeTotalItems) {
                throw new ValidacaoException("Essa quantidade é superior a que está no carrinho!");
            } else if (quantidadeTotalItems.equals(dados.quantidade())) {
                carrinhoRepository.deleteAllByFuncionarioIdAndProdutoId(dados.funcionarioId(), dados.produtoId());
            } else {
                quantidadeTotalItems = dados.quantidade();
                for (Carrinho itemCarrinho : itemsCarrinho) {
                    if (quantidadeTotalItems > 0) {
                        quantidadeTotalItems -= itemCarrinho.getQuantidade();
                        itemCarrinho.setQuantidade(quantidadeTotalItems);
                    }
                }
            }

            estoqueProduto.atualizarQuantidade(dados.quantidade(), true);
        }

        if (funcionarioId != null) {
            return listarCarrinho(funcionarioId);
        }
        return null;
    }

    public void limparCarrinho(Long funcionarioId, boolean reporEstoque) {

        List<Carrinho> listaItemsCarrinho = carrinhoRepository.findAllByFuncionarioId(funcionarioId);

        if (!listaItemsCarrinho.isEmpty()) {
            listaItemsCarrinho.forEach(itemCarrinho -> {
                if (reporEstoque) {
                    Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(itemCarrinho.getProduto().getId());
                    estoqueProduto.atualizarQuantidade(itemCarrinho.getQuantidade(), true);
                }

                carrinhoRepository.delete(itemCarrinho);
            });
        } else {
            throw new ValidacaoException("carrinho já está vazio");
        }
    }

    public List<DadosListagemCarrinho> listarCarrinho(Long id) {
        List<Carrinho> listCarrinho = carrinhoRepository.findAllByFuncionarioId(id);
        List<DadosListagemCarrinho> listItemsCarrinho = new ArrayList<>();

        if (!listCarrinho.isEmpty()) {
            for (Carrinho itemCarrinho : listCarrinho) {

                DadosListagemCarrinho itemExistente = listItemsCarrinho.stream()
                        .filter(dados -> dados.produto().id().equals(itemCarrinho.getProduto().getId()))
                        .findFirst()
                        .orElse(null);

                if (itemExistente == null) {
                    listItemsCarrinho.add(new DadosListagemCarrinho(itemCarrinho));
                } else {
                    listItemsCarrinho.remove(itemExistente);
                    listItemsCarrinho.add(new DadosListagemCarrinho(
                            itemCarrinho, itemExistente.quantidade() + itemCarrinho.getQuantidade()
                    ));
                }
            }
        }


        return listItemsCarrinho;
    }

    public BigDecimal calcularValorItems(List<Carrinho> listaItemsCarrinho) {
        BigDecimal valorTotal = BigDecimal.ZERO;

        for (Carrinho itemCarrinho : listaItemsCarrinho) {
            valorTotal = valorTotal.add(
                    itemCarrinho.getProduto().getValor()
                            .multiply(BigDecimal.valueOf(itemCarrinho.getQuantidade()))
            );
        }

        return valorTotal;
    }

}
