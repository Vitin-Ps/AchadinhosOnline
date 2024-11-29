package com.example.crudjava.domain.estoque;

import com.example.crudjava.domain.produto.Produto;
import com.example.crudjava.infra.exception.ValidacaoException;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "estoque")
@Entity(name = "Estoque")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Estoque {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id")
    private Produto produto;
    private Integer quantidade;

    public Estoque(Produto produto, Integer quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
    }

    public void atualizarQuantidade(Integer quantidade, Boolean acao) { // True add e False remove
        if(acao) {
            this.quantidade += quantidade;
        } else {
            if(this.quantidade < quantidade) {
                throw new ValidacaoException("Produto não tem essa quantidade no estoque!");
            }

            this.quantidade -= quantidade;
        }
    }
}
