package com.example.crudjava.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosAutentication(
        @NotNull(message = "Login não Informado!")
        @Email
        String login,
        @NotBlank(message = "Senha não informada!")
        String senha,
        String senhaAcesso
) {
}
