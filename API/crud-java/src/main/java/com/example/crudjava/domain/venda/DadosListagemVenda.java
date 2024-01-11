package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.funcionario.DadosDetalhamentoFuncionario;

import java.math.BigDecimal;

public record DadosListagemVenda(Long id, DadosDetalhamentoFuncionario funcionario, BigDecimal venda, BigDecimal comissao) {
    public DadosListagemVenda(Venda venda) {
        this(venda.getId(), new DadosDetalhamentoFuncionario(venda.getFuncionario()), venda.getValor(), venda.getComissao());
    }
}
