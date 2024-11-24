package com.example.crudjava.domain.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosAutentication(
        @NotNull(message = "Login não Informado!")
        String login,
        @NotBlank(message = "Senha não informada!")
        String senha,
        String senhaAcesso
) {
}
