package com.example.achadinhos_online.domain.produto;

import java.math.BigDecimal;

public record DadosDetalhamentoProduto(Long id, String nome, BigDecimal valor) {
    public DadosDetalhamentoProduto(Produto produto) {
        this(produto.getId(), produto.getNome(), produto.getValor());
    }
}
