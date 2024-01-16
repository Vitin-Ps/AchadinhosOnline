package com.example.achadinhos_online.domain.funcionario;

public record DadosListagemFuncionario(Long id, String nome, Integer porcentagem) {
    public DadosListagemFuncionario(Funcionario funcionario) {
        this(funcionario.getId(), funcionario.getNome(), funcionario.getPorcentagem());
    }
}
