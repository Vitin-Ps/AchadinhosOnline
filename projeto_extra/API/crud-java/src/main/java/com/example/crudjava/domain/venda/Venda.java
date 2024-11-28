package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.funcionario.Funcionario;
import jakarta.persistence.*;
import lombok.*;

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
    @Setter
    private String nomeCliente;
    @Setter
    private BigDecimal valorTotal;
    @Setter
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

    public BigDecimal calculaComissao(Funcionario funcionario, BigDecimal valor) {
        return valor.multiply(
                BigDecimal.valueOf(funcionario.getPorcentagem()).divide(BigDecimal.valueOf(100)));
    }
}
