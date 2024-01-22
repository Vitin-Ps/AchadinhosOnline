package com.example.crudjava.domain.funcionario;

import io.micrometer.common.util.StringUtils;
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
    private String imagem;
    private Boolean ativo;

    public Funcionario(@Valid DadosCadastroFuncionario dados, String imagem) {
        this.nome = dados.nome();
        this.email = dados.email();
        this.porcentagem = dados.porcentagem();
        this.ativo = true;
        this.imagem = imagem;
    }

    public void atualizarInfo(DadosAtualizaFuncionario dados, String imagem) {
        if(!StringUtils.isBlank(dados.nome())) {
            this.nome = dados.nome();
        }
        if(!StringUtils.isBlank(dados.email())) {
            this.email = dados.email();
        }
        if(dados.porcentagem() != null) {
            this.porcentagem = dados.porcentagem();
        }
        if(!StringUtils.isBlank(imagem)) {
            this.imagem = imagem;
        }
    }

    public void excluirLogico() {
        this.ativo = false;
    }
}
