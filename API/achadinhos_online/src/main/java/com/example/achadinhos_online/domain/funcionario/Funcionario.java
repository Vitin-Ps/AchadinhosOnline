package com.example.achadinhos_online.domain.funcionario;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

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

    public Funcionario(DadosCadastraFuncionario dados) {
        this.nome = dados.nome();
        this.email = dados.email();
        this.porcentagem = dados.porcentagem();
        this.ativo = true;
    }

    public void alterar(DadosAtualizaFuncionario dados) {
        if(dados.nome() != null) this.nome = dados.nome();
        if(dados.email() != null) this.email = dados.email();
        if(dados.porcentagem() != null) this.porcentagem = dados.porcentagem();
    }

    public void deletarLogico() {
        this.ativo = false;
    }
}
