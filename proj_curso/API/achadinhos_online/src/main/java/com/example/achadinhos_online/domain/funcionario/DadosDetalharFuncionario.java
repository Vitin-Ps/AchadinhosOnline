package com.example.achadinhos_online.domain.funcionario;

public record DadosDetalharFuncionario(Long id, String nome, String email, Integer porcentagem) {
    public DadosDetalharFuncionario(Funcionario funcionario) {
        this(funcionario.getId(), funcionario.getNome(), funcionario.getEmail(), funcionario.getPorcentagem());
    }
}
