package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.funcionario.Funcionario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Table(name = "vendas")
@Entity(name = "Venda")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Venda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;
    private String nomeCliente;
    private BigDecimal valorTotal;

    public Venda (Funcionario funcionario, BigDecimal valorTotal, String nomeCliente) {
        this.funcionario = funcionario;
        this.valorTotal = valorTotal;
        this.nomeCliente = nomeCliente;
    }

    public void atualizarInformacoes(DadosAtualizaVenda dados, Funcionario funcionario) {
        if(funcionario != null) {
            this.funcionario = funcionario;
        }
        if(dados.valorTotal() != null) {
            this.valorTotal = dados.valorTotal();
        }
    }

    private BigDecimal calculaComissao(Funcionario funcionario, BigDecimal valor) {
        var porcentagem = new BigDecimal(funcionario.getPorcentagem()).divide(new BigDecimal("100"));
        return valor.multiply(porcentagem);
    }
}
