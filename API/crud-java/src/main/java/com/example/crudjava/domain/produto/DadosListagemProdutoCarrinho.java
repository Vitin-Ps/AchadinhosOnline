package com.example.crudjava.domain.produto;

import java.math.BigDecimal;

public record DadosListagemProdutoCarrinho(Long id, String nome, BigDecimal valor, Integer quantidade) {
    public DadosListagemProdutoCarrinho(Produto produto, Integer quantidade) {
        this(produto.getId(), produto.getNome(), produto.getValor(), quantidade);
    }
}