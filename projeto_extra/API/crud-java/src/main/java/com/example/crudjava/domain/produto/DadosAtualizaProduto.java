package com.example.crudjava.domain.produto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosAtualizaProduto(
        @NotNull(message = "id é Obrigatório")
        Long id,
        String nome,
        BigDecimal valor
) {
}
