package com.example.crudjava.domain.venda;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosResgistroVenda(
        @NotNull(message = "Funcionario é obrigatório!")
        Long funcionarioId,
        @NotBlank(message = "Nome do cliente é obrigatório!")
        String nomeCliente

) {
}
