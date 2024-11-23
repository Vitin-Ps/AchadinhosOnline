package com.example.crudjava.domain.venda;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosResgistroVenda(
        @NotNull(message = "Funcionario é obrigatório!")
        Long idFuncionario,
        @NotBlank(message = "Nome do cliente é obrigatório!")
        String nomeCliente

) {
}
