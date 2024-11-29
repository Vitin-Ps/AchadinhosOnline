package com.example.crudjava.domain.recibo;

import com.example.crudjava.domain.carrinho.Carrinho;
import com.example.crudjava.domain.produto.Produto;

public record DadosRegistroRecibo(
        Long id,
        Produto produto,
        Integer quantidade
) {
    public DadosRegistroRecibo(Carrinho carrinho, Integer quantidade) {
        this(carrinho.getId(), carrinho.getProduto(), quantidade);
    }
}
