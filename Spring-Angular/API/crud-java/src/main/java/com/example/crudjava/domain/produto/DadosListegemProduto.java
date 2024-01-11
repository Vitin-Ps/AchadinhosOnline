package com.example.crudjava.domain.produto;

import java.math.BigDecimal;

public record DadosListegemProduto(Long id, String nome, BigDecimal valor) {
    public DadosListegemProduto(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getValor());
    }
}
