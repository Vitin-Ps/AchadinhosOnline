package com.example.crudjava.domain.funcionario;

public record DadosListagemFuncionario(Long id, String nome, String email, Integer porcentagem) {
    public DadosListagemFuncionario(Funcionario funcionario) {
        this(funcionario.getId(), funcionario.getNome(), funcionario.getEmail(), funcionario.getPorcentagem());
    }
}
