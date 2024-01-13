package com.example.achadinhos_online.domain.funcionario;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizaFuncionario(
        @NotNull(message = "Id do Funcionário é Obrigatório")
        Long id,
        String nome,
        String email,
        Integer porcentagem
) {
}
