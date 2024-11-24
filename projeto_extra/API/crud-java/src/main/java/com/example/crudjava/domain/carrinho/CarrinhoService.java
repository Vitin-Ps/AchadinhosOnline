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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
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

    public void addNoCarrinho(List<DadosCarrinho> dadosList) {
        for (DadosCarrinho dados : dadosList) {

            if(dados.quantidade() == null) {
                throw new ValidacaoException("O campo quantidade é obrigatório!");
            }

            Funcionario funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.funcionarioId());
            Produto produto = produtoRepository.getReferenceByIdAndAtivoTrue(dados.produtoId());

            if(produto == null || funcionario == null){
                throw new ValidacaoException("Funcionário ou Produto inexistentes!");
            }

            Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(dados.produtoId());

            estoqueProduto.atualizarQuantidade(dados.quantidade(), false);

            Carrinho carrinho = new Carrinho(null, funcionario, produto, dados.quantidade());
            carrinhoRepository.save(carrinho);
        }
    }

    public void removerItemDoCarrinho(List<DadosCarrinho> dadosList) {
        for (DadosCarrinho dados : dadosList) {
            Carrinho carrinho = carrinhoRepository.findFirstByFuncionarioIdAndProdutoId(dados.funcionarioId(), dados.produtoId());
            if (carrinho == null) throw new ValidacaoException("item não está no carrinho");



            Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(carrinho.getProduto().getId());

            if(dados.quantidade() > carrinho.getQuantidade()) {
                throw new ValidacaoException("Essa quantidade é superior a que está no carrinho!");
            } else if (carrinho.getQuantidade().equals(dados.quantidade())) {
                carrinhoRepository.delete(carrinho);
            }

            estoqueProduto.atualizarQuantidade(dados.quantidade(), true);
        }
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
        return carrinhoRepository.findAllByFuncionarioId(id).stream().map(DadosListagemCarrinho::new).toList();
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
