package com.example.achadinhos_online.domain.produto;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosAtualizaProduto(
        @NotNull(message = "Id é Obrigatório!")
        Long id,
        String nome,
        BigDecimal valor
) {
}