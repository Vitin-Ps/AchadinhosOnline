package com.example.crudjava.domain.produto;

import java.math.BigDecimal;

public record DadosListegemProduto(Long id, String nome, BigDecimal valor, String imagem) {
    public DadosListegemProduto(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getValor(), produto.getImagem());
    }
}
