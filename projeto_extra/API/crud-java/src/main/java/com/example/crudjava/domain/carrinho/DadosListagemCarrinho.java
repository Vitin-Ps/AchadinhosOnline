package com.example.crudjava.domain.carrinho;

import com.example.crudjava.domain.funcionario.DadosListagemFuncionario;
import com.example.crudjava.domain.produto.DadosListagemProduto;

public record DadosListagemCarrinho(
        Long id,
        DadosListagemFuncionario funcionario,
        DadosListagemProduto produto,
        Integer quantidade
) {
    public DadosListagemCarrinho(Carrinho carrinho) {
        this(carrinho.getId(), new DadosListagemFuncionario(carrinho.getFuncionario()), new DadosListagemProduto(carrinho.getProduto()), carrinho.getQuantidade());
    }
}
