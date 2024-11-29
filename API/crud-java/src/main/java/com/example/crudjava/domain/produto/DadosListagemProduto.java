package com.example.crudjava.domain.produto;

import java.math.BigDecimal;

public record DadosListagemProduto(Long id, String nome, BigDecimal valor) {
    public DadosListagemProduto(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getValor());
    }
}
