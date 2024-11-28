package com.example.crudjava.domain.venda;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosAtualizaVenda(
        @NotNull(message = "Id da venda é obrigatório!")
        Long id,
        String nomeCliente
) {
}
