package com.example.crudjava.domain.funcionario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroFuncionario(
        @NotBlank(message = "Nome é obrigatório!")
        String nome,
        @NotBlank(message = "E-mail é obrigatório!")
        @Email
        String email,
        @NotNull(message = "Porcentagem é obrigatória!")
        Integer porcentagem
) {
}
