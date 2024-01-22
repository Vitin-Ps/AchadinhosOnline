package com.example.crudjava.domain.funcionario;

public record DadosDetalhamentoFuncionario(Long id, String nome, String email, Integer porcentagem, String imagem) {
    public DadosDetalhamentoFuncionario(Funcionario funcionario) {
        this(funcionario.getId(), funcionario.getNome(), funcionario.getEmail(), funcionario.getPorcentagem(), funcionario.getImagem());
    }
}
