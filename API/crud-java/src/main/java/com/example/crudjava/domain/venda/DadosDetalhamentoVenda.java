package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.funcionario.DadosDetalhamentoFuncionario;

import java.math.BigDecimal;

public record DadosDetalhamentoVenda(Long id, DadosDetalhamentoFuncionario funcionario, BigDecimal valorTotal,
                                     BigDecimal comissaoTotal, String nomeCliente) {
    public DadosDetalhamentoVenda(Venda venda) {
        this(venda.getId(), new DadosDetalhamentoFuncionario(venda.getFuncionario()), venda.getValorTotal(), venda.getComissaoTotal(), venda.getNomeCliente());
    }
}
