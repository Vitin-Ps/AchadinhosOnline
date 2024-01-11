package com.example.crudjava.domain.carrinho;

import jakarta.validation.constraints.NotNull;

public record DadosCarrinho(
        @NotNull
        Long funcionarioId,
        @NotNull
        Long produtoId
) {
}
