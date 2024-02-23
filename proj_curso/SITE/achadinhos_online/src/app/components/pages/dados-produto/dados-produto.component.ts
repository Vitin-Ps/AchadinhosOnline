import { Component, OnInit, numberAttribute } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../interfaces/Produto';
import { FuncionalidadesService } from '../../../services/funcionalidades.service';

@Component({
  selector: 'app-dados-produto',
  templateUrl: './dados-produto.component.html',
  styleUrl: './dados-produto.component.scss',
})
export class DadosProdutoComponent implements OnInit {
  allProdutos: Produto[] = [];
  produtos: Produto[] = [];
  produto?: Produto;
  pageNumber: number = 0;
  totalPages!: number;

  constructor(private produtoService: ProdutoService) {}
  ngOnInit(): void {
    this.listarProdutos(0, 9, 'nome');
  }

  listarProdutos(page: number, size: number, sort: string) {
    this.produtoService.listarPage(page, size, sort).subscribe((res) => {
      this.allProdutos = res.content;
      this.produtos = res.content;
      this.totalPages = res.totalPages!;
      this.pageNumber = res.pageable!.pageNumber + 1;
    });
  }

  selecionarCard(produtoSelecionado: Produto) {
    this.produtos.forEach((produto) => {
      if (produto.id !== produtoSelecionado.id) produto.selecionado = false;
    });
    produtoSelecionado.selecionado = !produtoSelecionado.selecionado;
    this.produto = produtoSelecionado;
  }

  mudarPagina(pageAcao: boolean) {
    if (pageAcao && this.totalPages > this.pageNumber) {
      this.listarProdutos(this.pageNumber, 9, 'nome');
    } else if (!pageAcao && this.pageNumber != 1) {
      this.listarProdutos(this.pageNumber - 2, 9, 'nome');
    }
  }

  pesquisar(e: Event) {
    const target = e.target as HTMLInputElement;
    this.produtos = this.allProdutos.filter((produto) => {
      const nome = FuncionalidadesService.removerAcentuacoes(produto.nome);
      return nome.includes(
        FuncionalidadesService.removerAcentuacoes(target.value)
      );
    });
  }
}
