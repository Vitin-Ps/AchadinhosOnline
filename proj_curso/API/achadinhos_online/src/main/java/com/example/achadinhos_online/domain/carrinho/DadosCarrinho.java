package com.example.achadinhos_online.domain.carrinho;

import jakarta.validation.constraints.NotNull;

public record DadosCarrinho(
        @NotNull
        Long idFuncionario,
        @NotNull
        Long idProduto
) {
}
