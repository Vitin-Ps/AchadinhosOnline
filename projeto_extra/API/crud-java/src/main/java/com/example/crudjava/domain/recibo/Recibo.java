package com.example.crudjava.domain.recibo;

import com.example.crudjava.domain.produto.Produto;
import com.example.crudjava.domain.venda.Venda;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "recibo")
@Entity(name = "Recibo")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Recibo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id")
    private Produto produto;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venda_id")
    private Venda venda;
    private Integer quantidade;

    public Recibo(Produto produto, Venda venda, Integer quantidade) {
        this.produto = produto;
        this.venda = venda;
        this.quantidade = quantidade;
    }
}
