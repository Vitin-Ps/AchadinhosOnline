import { Component, OnInit } from '@angular/core';
import { Venda } from '../../../interfaces/Venda';
import { VendaService } from '../../../services/venda.service';
import { ComunicacaoService } from '../../../services/comunicacao.service';
import { MensagensService } from '../../../services/mensagens.service';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FuncionalidadesExtrasService } from '../../../services/funcionalidades-extras.service';

@Component({
  selector: 'app-vendas-dados',
  templateUrl: './vendas-dados.component.html',
  styleUrl: './vendas-dados.component.css',
})
export class VendasDadosComponent implements OnInit {
  allVendas: Venda[] = [];
  allVendasFiltrado: Venda[] = [];
  vendas: Venda[] = [];
  funcionarios: Funcionario[] = [];
  idFuncSelecionario: number = 0;
  idVendaSelecionada: number = 0;
  totalVendasDoFuncionario: {
    vendas: number;
    valorTotal: number;
    comissao: number;
  } | null = null;

  faSearch = faSearch;

  registrosPorPagina = 15;
  numPaginas = 0;
  numPaginasArray: { numPagina: number; selected: boolean }[] = [];

  pageAtual = 1;

  grupoAtual: number = 1;
  paginasPorGrupo = 5;

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

  gerarPaginacao() {
    this.grupoAtual = 1;
    this.atualizarPaginacao();
  }

  atualizarPaginacao() {
    const inicioPaginacao: number = (this.grupoAtual - 1) * this.paginasPorGrupo + 1;
    const fimPaginacao: number = Math.min(this.grupoAtual * this.paginasPorGrupo, this.numPaginas);

    this.numPaginasArray = [];
    for (let i = inicioPaginacao; i <= fimPaginacao; i++) {
      this.numPaginasArray.push({ numPagina: i, selected: false });
    }

    this.numPaginasArray.forEach(cardPaginacao => {
      if (cardPaginacao.numPagina === this.pageAtual) cardPaginacao.selected = true;
    });
  }

  alterarPaginacao(acao: boolean) {
    if (acao) this.grupoAtual++;
    else this.grupoAtual--;

    this.atualizarPaginacao();
  }

  selecionarPagina(idPagina: number) {
    this.numPaginasArray.forEach(numPagina => {
      numPagina.selected = false;

      if (numPagina.numPagina === idPagina) numPagina.selected = true;
    });

    this.pageAtual = idPagina;

    this.vendas = this.filtraVenda(this.allVendasFiltrado);
  }

  searchVenda(e: Event) {
    const target = e.target as HTMLInputElement;
    const text = FuncionalidadesExtrasService.removerAcentuacoes(target.value);

    this.vendas = this.allVendasFiltrado.filter(venda => {
      const numeroValido = !isNaN(Number(text));
      const idIgual = numeroValido && venda.id === Number(text);
      const nomeIgual = FuncionalidadesExtrasService.removerAcentuacoes(venda.nomeCliente).includes(
        text
      );

      return idIgual || nomeIgual;
    });

    this.vendas = this.filtraVenda(this.vendas);
    this.gerarPaginacao();
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

      this.allVendasFiltrado = data;
      this.vendas = this.filtraVenda(this.allVendasFiltrado);

      this.numPaginas = Math.ceil(data.length / this.registrosPorPagina);
      this.calcularDadosFuncionario();
    });
  }

  calcularDadosFuncionario() {
    if (this.idFuncSelecionario != 0) {
      this.allVendasFiltrado = this.allVendas.filter(
        venda => venda.funcionario.id === this.idFuncSelecionario
      );

      this.vendas = this.filtraVenda(this.allVendasFiltrado);

      this.numPaginas = Math.ceil(this.allVendasFiltrado.length / this.registrosPorPagina);
    } else {
      this.allVendasFiltrado = this.allVendas;
      this.vendas = this.filtraVenda(this.allVendasFiltrado);
    }
    let vendas: number = 0;
    let comissao: number = 0;
    let valorTotal: number = 0;

    this.allVendasFiltrado.forEach(venda => {
      vendas++;
      comissao += venda.valorTotal * (venda.funcionario.porcentagem / 100);
      valorTotal += venda.valorTotal;
    });

    this.totalVendasDoFuncionario = {
      vendas: vendas,
      valorTotal: valorTotal,
      comissao: comissao,
    };

    this.gerarPaginacao();
  }

  filtraVenda(vendaFiltro: Venda[]): Venda[] {
    return vendaFiltro.filter(
      (_, index) =>
        index >= this.registrosPorPagina * (this.pageAtual - 1) &&
        index < this.registrosPorPagina * this.pageAtual
    );
  }

  selecionarFuncionario(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.idFuncSelecionario = Number(value);
    this.calcularDadosFuncionario();
  }

  removerVenda() {
    this.vendaService.excluirVenda(this.idVendaSelecionada).subscribe(() => {
      this.idVendaSelecionada = 0;
      window.location.reload();
    });
  }

  chamarConfirm(id: number) {
    this.idVendaSelecionada = id;
    this.mensagemService.confirm('Tem certeza que quer excluir essa venda?');
  }
}