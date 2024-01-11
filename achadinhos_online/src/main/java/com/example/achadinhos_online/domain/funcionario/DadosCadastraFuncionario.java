package com.example.achadinhos_online.domain.funcionario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastraFuncionario(
        @NotBlank(message = "Nome é Obrigatório")
        String nome,
        @NotBlank(message = "Nome é Obrigatório")
        @Email
        String email,
        @NotNull(message = "Nome é Obrigatório")
        Integer porcentagem
) {
}
