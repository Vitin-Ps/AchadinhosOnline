package com.example.crudjava.domain.funcionario;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizaFuncionario(
        @NotNull
        Long id,
        String nome,
        String email,
        Integer porcentagem
) {
}
