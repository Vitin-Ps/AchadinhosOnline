package com.example.crudjava.domain.funcionario;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "funcionarios")
@Entity(name = "Funcionario")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    private Integer porcentagem;
    private Boolean ativo;

    public Funcionario(@Valid DadosCadastroFuncionario dados) {
        this.nome = dados.nome();
        this.email = dados.email();
        this.porcentagem = dados.porcentagem();
        this.ativo = true;
    }

    public void atualizarInfo(DadosAtualizaFuncionario dados) {
        if(dados.nome() != null) {
            this.nome = dados.nome();
        }
        if(dados.email() != null) {
            this.email = dados.email();
        }
        if(dados.porcentagem() != null) {
            this.porcentagem = dados.porcentagem();
        }
    }

    public void excluirLogico() {
        this.ativo = false;
    }
}
