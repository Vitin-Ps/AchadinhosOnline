package com.example.crudjava.infra.email;

public record DadosEnviarEmail(
        String destino,
        String assunto,
        String mensagem
) {
}
