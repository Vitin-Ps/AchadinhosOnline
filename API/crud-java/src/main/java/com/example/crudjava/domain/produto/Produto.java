package com.example.crudjava.domain.produto;

import io.micrometer.common.util.StringUtils;
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
    private String imagem;
    private Boolean ativo;

    public Produto(@Valid DadosCadastroProduto dados, String imagem) {
        this.nome = dados.nome();
        this.valor = dados.valor();
        this.imagem = imagem;
        this.ativo = true;
    }

    public void atualizarInfo(DadosAtualizaProduto dados, String imagem) {
        if(!StringUtils.isBlank(dados.nome())) this.nome = dados.nome();

        if(dados.valor() != null) this.valor = dados.valor();
        if(!StringUtils.isBlank(imagem)) this.imagem = imagem;
    }

    public void excluirLogico() {
        this.ativo = false;
    }
}
