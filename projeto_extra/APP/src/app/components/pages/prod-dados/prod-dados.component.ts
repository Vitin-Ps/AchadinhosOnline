import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Produto } from '../../../interfaces/Produto';
import { ProdutoService } from '../../../services/produto.service';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FuncionalidadesExtrasService } from '../../../services/funcionalidades-extras.service';
import { MensagensService } from '../../../services/mensagens.service';
import { ComunicacaoService } from '../../../services/comunicacao.service';

@Component({
  selector: 'app-prod-dados',
  templateUrl: './prod-dados.component.html',
  styleUrl: './prod-dados.component.css',
})
export class ProdDadosComponent implements OnInit {
  allProdutos: Produto[] = [];
  allProdutosFiltrado: Produto[] = [];
  produtos: Produto[] = [];
  produto!: Produto | null;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  registrosPorPagina = 15;
  numPaginas = 0;
  numPaginasArray: { numPagina: number; selected: boolean }[] = [];
  pageAtual = 1;
  grupoAtual: number = 1;
  paginasPorGrupo = 5;

  constructor(
    private produtoService: ProdutoService,
    private mensagemService: MensagensService,
    private comunicacaoService: ComunicacaoService
  ) {}

  ngOnInit(): void {
    this.listarProdutos(0, 9);

    this.comunicacaoService.emitFunction.subscribe(() => {
      if (this.produto != null) this.removerProduto();
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

    this.produtos = this.filtraListaProduto(this.allProdutosFiltrado);
  }

  searchInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const text = FuncionalidadesExtrasService.removerAcentuacoes(target.value);

    this.produtos = this.allProdutosFiltrado.filter(produto => {
      const numeroValido = !isNaN(Number(text));
      const idIgual = numeroValido && produto.id === Number(text);
      const nomeIgual = FuncionalidadesExtrasService.removerAcentuacoes(produto.nome).includes(
        text
      );

      return idIgual || nomeIgual;
    });

    this.numPaginas = Math.ceil(this.produtos.length / this.registrosPorPagina);

    this.produtos = this.filtraListaProduto(this.produtos);
    this.gerarPaginacao();
  }

  filtraListaProduto(produtoFiltro: Produto[]): Produto[] {
    return produtoFiltro.filter(
      (_, index) =>
        index >= this.registrosPorPagina * (this.pageAtual - 1) &&
        index < this.registrosPorPagina * this.pageAtual
    );
  }

  selecionarCard(produtoSelecionado: Produto) {
    this.produtos.forEach(produto => {
      if (produto.id === produtoSelecionado.id) {
        produto.selecionado = !produto.selecionado;
      } else {
        produto.selecionado = false;
      }
      this.produto = produtoSelecionado;
    });
  }

  chamarComfirm(produto: Produto) {
    console.log('cheguei');
    this.mensagemService.confirm(
      `Tem certeza que quer excluir \n ${produto.nome} - ${FuncionalidadesExtrasService.moedaReal(
        produto.valor
      )}`
    );
  }

  removerProduto() {
    this.produtoService.excluirProdutoLogico(this.produto!.id!).subscribe(() => {
      window.location.reload();
    });
  }

  listarProdutos(page: number, numDados: number) {
    this.produtoService.listarProdutosPage(page, numDados, 'nome').subscribe(item => {
      this.allProdutos = item.content;
      this.allProdutosFiltrado = item.content;
      this.produtos = this.filtraListaProduto(this.allProdutosFiltrado);

      this.numPaginas = Math.ceil(item.content.length / this.registrosPorPagina);

      this.gerarPaginacao();
    });
    this.produto = null;
  }
}
