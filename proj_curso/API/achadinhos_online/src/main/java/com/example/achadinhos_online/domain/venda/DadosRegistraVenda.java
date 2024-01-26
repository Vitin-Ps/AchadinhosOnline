package com.example.achadinhos_online.domain.venda;

import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosRegistraVenda(
        @NotNull(message = "Id do funcionário é obrigatório")
        Long idFuncionario,
        @NotNull(message = "Valor é obrigatório")
        BigDecimal valor
) {
}
