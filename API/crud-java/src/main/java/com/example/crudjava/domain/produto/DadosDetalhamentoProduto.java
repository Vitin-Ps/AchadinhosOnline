package com.example.crudjava.domain.produto;

import java.math.BigDecimal;

public record DadosDetalhamentoProduto(Long id, String nome, BigDecimal valor, String imagem) {
    public DadosDetalhamentoProduto(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getValor(), produto.getImagem());
    }
}
