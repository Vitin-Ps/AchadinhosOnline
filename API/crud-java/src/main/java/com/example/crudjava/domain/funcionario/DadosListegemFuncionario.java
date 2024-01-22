package com.example.crudjava.domain.funcionario;

public record DadosListegemFuncionario(Long id, String nome, String email, Integer porcentagem, String imagem) {
    public DadosListegemFuncionario(Funcionario funcionario) {
        this(funcionario.getId(), funcionario.getNome(), funcionario.getEmail(), funcionario.getPorcentagem(), funcionario.getImagem());
    }
}
