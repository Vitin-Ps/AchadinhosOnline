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

            Funcionario funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.funcionarioId());
            Produto produto = produtoRepository.getReferenceByIdAndAtivoTrue(dados.produtoId());

            if(produto == null || funcionario == null){
                throw new ValidacaoException("Funcionário ou Produto inexistentes!");
            }

            Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(dados.produtoId());

            estoqueProduto.atualizaQuantantidade(dados.quantidade(), false);

            Carrinho carrinho = new Carrinho(null, funcionario, produto, dados.quantidade());
            carrinhoRepository.save(carrinho);
        }
    }

    public void removerItemDoCarrinho(List<DadosCarrinho> dadosList) {
        for (DadosCarrinho dados : dadosList) {
            var carrinho = carrinhoRepository.findFirstByFuncionarioIdAndProdutoId(dados.funcionarioId(), dados.produtoId());
            if (carrinho == null) throw new ValidacaoException("item não está no carrinho");
            carrinhoRepository.deleteById(carrinho.getId());
        }
    }

    public void limparCarrinho(Long funcionarioId, boolean reporEstoque) {

        List<Carrinho> listaItemsCarrinho = carrinhoRepository.findAllByFuncionarioId(funcionarioId);

        if (!listaItemsCarrinho.isEmpty()) {
            listaItemsCarrinho.forEach(itemCarrinho -> {
                if (reporEstoque) {
                    Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(itemCarrinho.getProduto().getId());
                    estoqueProduto.atualizaQuantantidade(itemCarrinho.getQuantidade(), true);
                }

                carrinhoRepository.delete(itemCarrinho);
            });
        } else {
            throw new ValidacaoException("carrinho já está vazio");
        }
    }

    public Page<DadosListagemCarrinho> listarCarrinho(Long id, Pageable pageable) {
        return carrinhoRepository.findAllByFuncionarioId(id, pageable);
    }

    public BigDecimal calcularValorItems(List<Carrinho> listaItemsCarrinho) {
        BigDecimal valorTotal = BigDecimal.ZERO;

        listaItemsCarrinho.forEach(itemCarrinho -> {
            valorTotal.add(itemCarrinho.getProduto().getValor().multiply(BigDecimal.valueOf(itemCarrinho.getQuantidade())));
        });


        return valorTotal;
    }
}
