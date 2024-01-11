package com.example.crudjava.domain.carrinho;

import com.example.crudjava.domain.funcionario.Funcionario;
import com.example.crudjava.domain.produto.Produto;

public record DadosListagemCarrinho(
        Long id,
        Funcionario funcionario,
        Produto produto
) {
}
