package com.example.crudjava.domain.funcionario;

import com.example.crudjava.domain.venda.Venda;

import java.math.BigDecimal;

public record DadosComissaoFuncionario(Long idFuncionario, BigDecimal comissao) {
    public DadosComissaoFuncionario(Venda venda) {
        this(venda.getFuncionario().getId(), venda.getComissao());
    }
}
