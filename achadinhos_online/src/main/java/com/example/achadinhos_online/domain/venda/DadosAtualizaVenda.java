package com.example.achadinhos_online.domain.venda;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizaVenda(
        @NotNull
        Long id,
        @NotNull
        Long idFuncionario
) {
}
