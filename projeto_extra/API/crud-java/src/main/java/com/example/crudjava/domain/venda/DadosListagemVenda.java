package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.funcionario.DadosDetalhamentoFuncionario;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DadosListagemVenda(
        Long id,
        DadosDetalhamentoFuncionario funcionario,
        BigDecimal valorTotal,
        BigDecimal comissaoTotal,
        String nomeCliente,
        LocalDateTime dateCreated,
        LocalDateTime dateUpdated

) {
    public DadosListagemVenda(Venda venda) {
        this(venda.getId(), new DadosDetalhamentoFuncionario(venda.getFuncionario()), venda.getValorTotal(), venda.getComissaoTotal(), venda.getNomeCliente(), venda.getDateCreated(), venda.getDateUpdated());
    }
}
