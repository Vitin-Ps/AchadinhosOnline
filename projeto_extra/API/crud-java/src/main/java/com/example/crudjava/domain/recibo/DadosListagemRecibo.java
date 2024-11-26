package com.example.crudjava.domain.recibo;

import com.example.crudjava.domain.produto.DadosListagemProduto;
import com.example.crudjava.domain.venda.DadosListagemVenda;

import java.math.BigDecimal;

public record DadosListagemRecibo(
        DadosListagemProduto produto,
        DadosListagemVenda venda,
        Integer quantidade,
        BigDecimal valorTotal) {
    public DadosListagemRecibo(Recibo recibo) {
        this(new DadosListagemProduto(recibo.getProduto()), new DadosListagemVenda(recibo.getVenda()), recibo.getQuantidade(), recibo.getProduto().getValor().multiply(BigDecimal.valueOf(recibo.getQuantidade())));
    }
}
