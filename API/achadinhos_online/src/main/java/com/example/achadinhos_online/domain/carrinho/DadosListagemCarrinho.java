package com.example.achadinhos_online.domain.carrinho;

import java.math.BigDecimal;

public record DadosListagemCarrinho(
        Long id,
        Long idFuncionario,
        BigDecimal valor
) {
    public DadosListagemCarrinho(Carrinho carrinho) {
        this(carrinho.getId(), carrinho.getFuncionario().getId(), carrinho.getProduto().getValor());
    }
}
