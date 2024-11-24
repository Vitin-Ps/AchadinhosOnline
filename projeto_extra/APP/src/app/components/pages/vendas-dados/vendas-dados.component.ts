import { Component, OnInit } from '@angular/core';
import { Venda } from '../../../interfaces/Venda';
import { VendaService } from '../../../services/venda.service';
import { ComunicacaoService } from '../../../services/comunicacao.service';
import { MensagensService } from '../../../services/mensagens.service';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
  selector: 'app-vendas-dados',
  templateUrl: './vendas-dados.component.html',
  styleUrl: './vendas-dados.component.css',
})
export class VendasDadosComponent implements OnInit {
  allVendas: Venda[] = [];
  vendas: Venda[] = [];
  funcionarios: Funcionario[] = [];
  idFuncSelecionario: number = 0;
  idVendaSelecionada: number = 0;
  totalVendasDoFuncionario: {
    vendas: number;
    valorTotal: number;
    comissao: number;
  } | null = null;

  constructor(
    private vendaService: VendaService,
    private funcionarioService: FuncionarioService,
    private comunicacaoService: ComunicacaoService,
    private mensagemService: MensagensService
  ) {}

  ngOnInit(): void {
    this.listarFuncionarios();
    this.listarVendas();
    this.comunicacaoService.emitFunction.subscribe(() => {
      if (this.idVendaSelecionada != 0) this.removerVenda();
    });
  }

  listarFuncionarios() {
    this.funcionarioService
      .listarFuncionariosAll()
      .subscribe(res => (this.funcionarios = res.content));
  }

  listarVendas() {
    this.vendaService.listarVendas().subscribe(item => {
      const data = item.content;

      data.forEach(venda => {
        venda.comissao = venda.valorTotal * (venda.funcionario.porcentagem / 100);
      });

      this.allVendas = data;
      this.vendas = data;
      this.calcularDadosFuncionario();
    });
  }

  calcularDadosFuncionario() {
    if (this.idFuncSelecionario != 0) {
      this.vendas = this.allVendas.filter(
        venda => venda.funcionario.id === this.idFuncSelecionario
      );
    } else {
      this.vendas = this.allVendas;
    }
    let vendas: number = 0;
    let comissao: number = 0;
    let valorTotal: number = 0;

    this.vendas.forEach(venda => {
      vendas++;
      comissao += venda.valorTotal * (venda.funcionario.porcentagem / 100);
      valorTotal += venda.valorTotal;
    });

    this.totalVendasDoFuncionario = {
      vendas: vendas,
      valorTotal: valorTotal,
      comissao: comissao,
    };
  }

  selecionarFuncionario(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.idFuncSelecionario = Number(value);
    this.calcularDadosFuncionario();
  }

  async removerVenda() {
    await this.vendaService.excluirVenda(this.idVendaSelecionada).subscribe(() => {
      this.idVendaSelecionada = 0;
      window.location.reload();
    });
  }

  chamarConfirm(id: number) {
    this.idVendaSelecionada = id;
    this.mensagemService.confirm('Tem certeza que quer excluir essa venda?');
  }
}
