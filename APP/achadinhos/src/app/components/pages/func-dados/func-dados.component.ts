import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Funcionario } from '../../../interfaces/Funcionario';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MensagensService } from '../../../services/mensagens.service';
import { ComunicacaoService } from '../../../services/comunicacao.service';
import { FuncionalidadesExtrasService } from '../../../services/funcionalidades-extras.service';
import { VendaService } from '../../../services/venda.service';
import { Venda } from '../../../interfaces/Venda';

@Component({
  selector: 'app-func-dados',
  templateUrl: './func-dados.component.html',
  styleUrl: './func-dados.component.css',
})
export class FuncDadosComponent {
  allFuncionarios: Funcionario[] = [];
  allFuncionariosFiltrado: Funcionario[] = [];
  funcionarios: Funcionario[] = [];
  allVendas: Venda[] = [];
  vendas: Venda[] = [];
  funcionario!: Funcionario | null;
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  dateInicio: Date | null = null;
  dateFim: Date | null = null;

  registrosPorPagina = 15;
  numPaginas = 0;
  numPaginasArray: { numPagina: number; selected: boolean }[] = [];
  pageAtual = 1;
  grupoAtual: number = 1;
  paginasPorGrupo = 5;

  constructor(
    private funcionarioService: FuncionarioService,
    private vendaService: VendaService,
    private mensagemService: MensagensService,
    private comunicacaoService: ComunicacaoService
  ) {}

  ngOnInit(): void {
    this.listarFuncionarios();
    this.listarVendas();

    this.comunicacaoService.emitFunction.subscribe(() => {
      if (this.funcionario != null) this.removerFuncionario();
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

    this.funcionarios = this.filtraListaFuncionario(this.allFuncionariosFiltrado);
  }

  searchInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const text = FuncionalidadesExtrasService.removerAcentuacoes(target.value);

    this.funcionarios = this.allFuncionariosFiltrado.filter(funcionario => {
      const numeroValido = !isNaN(Number(text));
      const idIgual = numeroValido && funcionario.id === Number(text);
      const nomeIgual = FuncionalidadesExtrasService.removerAcentuacoes(funcionario.nome).includes(
        text
      );

      return idIgual || nomeIgual;
    });

    this.numPaginas = Math.ceil(this.funcionarios.length / this.registrosPorPagina);

    this.funcionarios = this.filtraListaFuncionario(this.funcionarios);
    this.gerarPaginacao();
  }

  filtraListaFuncionario(produtoFiltro: Funcionario[]): Funcionario[] {
    return produtoFiltro.filter(
      (_, index) =>
        index >= this.registrosPorPagina * (this.pageAtual - 1) &&
        index < this.registrosPorPagina * this.pageAtual
    );
  }

  selecionarCard(funcionarioSelecionado: Funcionario) {
    this.funcionarios.forEach(funcionario => {
      if (funcionario.id === funcionarioSelecionado.id) {
        funcionario.selecionado = !funcionario.selecionado;
      } else {
        funcionario.selecionado = false;
      }
      this.funcionario = funcionarioSelecionado;
    });
  }

  pesquisar(e: Event) {
    const target = e.target as HTMLInputElement;
    const valor = FuncionalidadesExtrasService.removerAcentuacoes(target.value);
    console.log(valor);
    this.funcionarios = this.allFuncionarios.filter(funcionarios => {
      const nome = FuncionalidadesExtrasService.removerAcentuacoes(funcionarios.nome);
      return nome.includes(valor);
    });
  }

  chamarComfirm(funcionario: Funcionario) {
    console.log('cheguei');
    this.mensagemService.confirm(
      `Tem certeza que quer excluir \n ${funcionario.nome} - ${funcionario.porcentagem}%`
    );
  }

  removerFuncionario() {
    this.funcionarioService.excluirFuncionarioLogico(this.funcionario!.id!).subscribe(() => {
      window.location.reload();
    });
  }

  listarFuncionarios() {
    this.funcionarioService.listarFuncionariosAll().subscribe(item => {
      this.allFuncionarios = item;
      this.allFuncionariosFiltrado = item;
      this.funcionarios = this.filtraListaFuncionario(this.allFuncionariosFiltrado);

      this.numPaginas = Math.ceil(item.length / this.registrosPorPagina);

      this.gerarPaginacao();
    });
    this.funcionario = null;
  }

  listarVendas() {
    this.vendaService.listarVendas().subscribe(res => {
      this.allVendas = res.content;
      this.vendas = res.content;
    });
  }

  calcularcomissao(id: number): number {
    let comissao = 0;

    this.vendas.forEach(venda => {
      if (id === venda.funcionario.id) comissao += venda.comissaoTotal;
    });

    return comissao;
  }

  filtrarPorData(inputInicio: Event | null, inputFim: Event | null) {
    inputInicio &&
      (this.dateInicio = (inputInicio.target as HTMLInputElement).value
        ? FuncionalidadesExtrasService.getDateComparativa(
            (inputInicio.target as HTMLInputElement).value
          )
        : null);
    inputFim &&
      (this.dateFim = (inputFim.target as HTMLInputElement).value
        ? FuncionalidadesExtrasService.getDateComparativa(
            (inputFim.target as HTMLInputElement).value
          )
        : null);

    this.vendas = this.allVendas.filter(venda => {
      const dateCreated: Date = FuncionalidadesExtrasService.getDateComparativa(venda.dateCreated);

      if (this.dateInicio && this.dateFim) {
        return dateCreated >= this.dateInicio && dateCreated <= this.dateFim;
      } else if (this.dateInicio && !this.dateFim) {
        return dateCreated >= this.dateInicio;
      } else if (!this.dateInicio && this.dateFim) {
        return dateCreated <= this.dateFim;
      }

      return venda;
    });
  }
}
