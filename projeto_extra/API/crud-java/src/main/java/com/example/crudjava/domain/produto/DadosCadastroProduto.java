package com.example.crudjava.domain.produto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosCadastroProduto(
        @NotBlank(message = "Nome é obrigatório!")
        String nome,
        @NotNull(message = "Valor é obrigatório!")
        BigDecimal valor
) {
}
