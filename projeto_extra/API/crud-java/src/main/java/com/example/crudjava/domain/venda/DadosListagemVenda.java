package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.funcionario.DadosDetalhamentoFuncionario;

import java.math.BigDecimal;

public record DadosListagemVenda(Long id, DadosDetalhamentoFuncionario funcionario, BigDecimal valorTotal, String nomeCliente) {
    public DadosListagemVenda(Venda venda) {
        this(venda.getId(), new DadosDetalhamentoFuncionario(venda.getFuncionario()), venda.getValorTotal(), venda.getNomeCliente());
    }
}
