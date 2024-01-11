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
  produtos: Produto[] = [];
  shaded: boolean = false;
  produto!: Produto | null;
  pageNumber: number = 0;
  totalPages!: number;
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;

  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(
    private produtoService: ProdutoService,
    // private funcionalidades: FuncionalidadesExtrasService,
    private mensagemService: MensagensService,
    private comunicacaoService: ComunicacaoService
  ) {}
  
  async ngOnInit(): Promise<void> {
    await this.listarProdutos(0, 9);
    console.log(`on init:`);
    console.log(this.produtos);
    setTimeout(() => {
      this.verificarAltura();
    }, 100);
    
    await this.comunicacaoService.emitFunction.subscribe(() => {
      console.log('chegou no emit2');
      if (this.produto != null) this.removerProduto();
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

  selecionarCard(produtoSelecionado: Produto) {
    this.produtos.forEach((produto) => {
      if (produto.id === produtoSelecionado.id) {
        produto.selecionado = !produto.selecionado;
      } else {
        produto.selecionado = false;
      }
      this.produto = produtoSelecionado;
    });
  }

  pesquisar(e: Event) {
    const target = e.target as HTMLInputElement;
    const valor = FuncionalidadesExtrasService.removerAcentuacoes(target.value);
    console.log(valor);
    this.produtos = this.allProdutos.filter((produto) => {
      const nome = FuncionalidadesExtrasService.removerAcentuacoes(
        produto.nome
      );
      return nome.includes(valor);
    });
    setTimeout(() => {
      this.verificarAltura();
    }, 50);
  }

  chamarComfirm(produto: Produto) {
    console.log('cheguei');
    this.mensagemService.confirm(
      `Tem certeza que quer excluir \n ${
        produto.nome
      } - ${FuncionalidadesExtrasService.moedaReal(produto.valor)}`
    );
  }

  removerProduto() {
    this.produtoService
      .excluirProdutoLogico(this.produto!.id!)
      .subscribe(() => {
        window.location.reload();
      });
  }

  async listarProdutos(page: number, numDados: number) {
    await this.produtoService
      .listarProdutosPage(page, numDados, 'nome')
      .subscribe((item) => {
        this.allProdutos = item.content;
        this.produtos = item.content;
        this.pageNumber = item.pageable?.pageNumber! + 1;
        this.totalPages = item.totalPages!;
      });
    this.produto = null;
  }

  mudarPagina(pageAcao: boolean) {
    if (pageAcao && this.totalPages > this.pageNumber)
      this.listarProdutos(this.pageNumber, 9);
    else if (!pageAcao && this.pageNumber != 1)
      this.listarProdutos(this.pageNumber - 2, 9);
  }
}
