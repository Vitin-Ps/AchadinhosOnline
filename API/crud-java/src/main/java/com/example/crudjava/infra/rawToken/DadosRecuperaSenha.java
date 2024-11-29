package com.example.crudjava.infra.rawToken;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record DadosRecuperaSenha(
        @NotBlank(message = "Login não Informado!")
        @Email
        String login
) {
}
