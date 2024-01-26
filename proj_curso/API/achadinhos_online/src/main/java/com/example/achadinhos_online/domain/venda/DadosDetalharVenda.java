package com.example.achadinhos_online.domain.venda;

import com.example.achadinhos_online.domain.funcionario.DadosDetalharFuncionario;
import com.example.achadinhos_online.domain.funcionario.DadosListagemFuncionario;
import com.example.achadinhos_online.domain.funcionario.Funcionario;

import java.math.BigDecimal;

public record DadosDetalharVenda(Long id, DadosListagemFuncionario funcionario, BigDecimal valor, BigDecimal comissao) {
    public DadosDetalharVenda(Venda venda) {
        this(venda.getId(), new DadosListagemFuncionario(venda.getFuncionario()), venda.getValor(), venda.getComissao());
    }
}
