package com.example.crudjava.domain.venda;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosAtualizaVenda(
        @NotNull(message = "Id da venda é obrigatória!")
        Long id,
        @NotNull(message = "Id do Funcionario é Obrigatório!")
        Long idFuncionario,
        BigDecimal valor
) {
}
