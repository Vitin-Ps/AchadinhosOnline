import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Funcionario } from '../../../interfaces/Funcionario';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MensagensService } from '../../../services/mensagens.service';
import { ComunicacaoService } from '../../../services/comunicacao.service';
import { FuncionalidadesExtrasService } from '../../../services/funcionalidades-extras.service';

@Component({
  selector: 'app-func-dados',
  templateUrl: './func-dados.component.html',
  styleUrl: './func-dados.component.css'
})
export class FuncDadosComponent {
  allFuncionarios: Funcionario[] = [];
  funcionarios: Funcionario[] = [];
  shaded: boolean = false;
  funcionario!: Funcionario | null;
  pageNumber: number = 0;
  totalPages!: number;
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(
    private funcionarioService: FuncionarioService,
    // private funcionalidades: FuncionalidadesExtrasService,
    private mensagemService: MensagensService,
    private comunicacaoService: ComunicacaoService
  ) {}

  ngOnInit(): void {
    this.listarFuncionarios(0, 9);
    setTimeout(() => {
      this.verificarAltura();
    }, 10);

    this.comunicacaoService.emitFunction.subscribe(() => {
      console.log('chegou no emit2');
      if (this.funcionario != null) this.removerFuncionario();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.verificarAltura();
  }

  verificarAltura() {
    const cardsContainer = this.cardsContainer.nativeElement;
    if (cardsContainer.offsetHeight > 500) this.shaded = true;
    else this.shaded = false;
  }

  selecionarCard(funcionarioSelecionado: Funcionario) {
    this.funcionarios.forEach((funcionario) => {
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
    this.funcionarios = this.allFuncionarios.filter((funcionarios) => {
      const nome = FuncionalidadesExtrasService.removerAcentuacoes(
        funcionarios.nome
      );
      return nome.includes(valor);
    });
    setTimeout(() => {
      this.verificarAltura();
    }, 50);
  }

  chamarComfirm(funcionario: Funcionario) {
    console.log('cheguei');
    this.mensagemService.confirm(
      `Tem certeza que quer excluir \n ${
        funcionario.nome
      } - ${funcionario.porcentagem}%`);
  }

  removerFuncionario() {
    this.funcionarioService.excluirFuncionarioLogico(this.funcionario!.id!).subscribe(() => {
      window.location.reload();
    });
  }

  listarFuncionarios(page: number, numDados: number) {
    this.funcionarioService
      .listarFuncionariosPage(page, numDados, 'nome')
      .subscribe((item) => {
        this.allFuncionarios = item.content;
        this.funcionarios = item.content;
        this.pageNumber = item.pageable?.pageNumber! + 1;
        this.totalPages = item.totalPages!;
      });
      this.funcionario = null;
  }

  mudarPagina(pageAcao: boolean) {
    if (pageAcao && this.totalPages > this.pageNumber)
      this.listarFuncionarios(this.pageNumber, 9);
    else if (!pageAcao && this.pageNumber != 1) this.listarFuncionarios(this.pageNumber - 2, 9);
  }
}
