package com.example.crudjava.domain.produto;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Table(name = "produtos")
@Entity(name = "Produto")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private BigDecimal valor;
    private Boolean ativo;

    public Produto(@Valid DadosCadastroProduto dados) {
        this.nome = dados.nome();
        this.valor = dados.valor();
        this.ativo = true;
    }

    public void atualizarInfo(DadosAtualizaProduto dados) {
        if(dados.nome() != null) {
            this.nome = dados.nome();
        }
        if(dados.valor() != null) {
            this.valor = dados.valor();
        }
    }

    public void excluirLogico() {
        this.ativo = false;
    }
}
