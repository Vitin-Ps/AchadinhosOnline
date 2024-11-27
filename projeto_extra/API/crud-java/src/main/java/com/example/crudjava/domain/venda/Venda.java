package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.funcionario.Funcionario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
    private BigDecimal comissaoTotal;
    @Column(name = "date_created", updatable = false)
    private LocalDateTime dateCreated;

    @Column(name = "date_updated")
    private LocalDateTime dateUpdated;

    public Venda(Funcionario funcionario, BigDecimal valorTotal, String nomeCliente) {
        this.funcionario = funcionario;
        this.valorTotal = valorTotal;
        this.nomeCliente = nomeCliente;
        this.comissaoTotal = calculaComissao(funcionario, valorTotal);
    }

    public void atualizarInformacoes(DadosAtualizaVenda dados, Funcionario funcionario) {
        if (funcionario != null) {
            this.funcionario = funcionario;
        }
        if (dados.valorTotal() != null) {
            this.valorTotal = dados.valorTotal();
            if (funcionario != null)
                this.comissaoTotal = calculaComissao(funcionario, valorTotal);
        }

    }

    private BigDecimal calculaComissao(Funcionario funcionario, BigDecimal valor) {
        return valor.multiply(
                BigDecimal.valueOf(funcionario.getPorcentagem()).divide(BigDecimal.valueOf(100)));
    }
}
