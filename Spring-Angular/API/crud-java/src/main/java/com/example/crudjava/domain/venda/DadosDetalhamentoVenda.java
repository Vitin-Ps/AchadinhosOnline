package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.funcionario.DadosDetalhamentoFuncionario;
import com.example.crudjava.domain.funcionario.Funcionario;

import java.math.BigDecimal;

public record DadosDetalhamentoVenda(Long id, DadosDetalhamentoFuncionario funcionario, BigDecimal venda, BigDecimal comissao) {
    public DadosDetalhamentoVenda(Venda venda) {
        this(venda.getId(), new DadosDetalhamentoFuncionario(venda.getFuncionario()), venda.getValor(), venda.getComissao());
    }
}
