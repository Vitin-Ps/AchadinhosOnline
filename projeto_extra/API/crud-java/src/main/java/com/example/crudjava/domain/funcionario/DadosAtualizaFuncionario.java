package com.example.crudjava.domain.funcionario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosAtualizaFuncionario(
        @NotNull
        Long id,
        String nome,
        @NotBlank(message = "E-mail é obrigatório!")
        @Email
        String email,
        Integer porcentagem,
        String senha
) {
}
