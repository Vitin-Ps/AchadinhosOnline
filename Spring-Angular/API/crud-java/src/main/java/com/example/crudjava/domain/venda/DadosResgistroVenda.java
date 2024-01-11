package com.example.crudjava.domain.venda;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosResgistroVenda(
        @NotNull(message = "Funcionario é obrigatório!")
        Long idFuncionario,
        @NotNull(message = "Valor da venda é obrigatória!")
        BigDecimal valor

) {
}
