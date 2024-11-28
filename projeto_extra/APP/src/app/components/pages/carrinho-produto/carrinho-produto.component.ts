import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../interfaces/Produto';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProdutoService } from '../../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagensService } from '../../../services/mensagens.service';
import { CarrinhoEnvio } from '../../../interfaces/Carrinho';
import { CarrinhoService } from '../../../services/carrinho.service';
import { FuncionalidadesExtrasService } from '../../../services/funcionalidades-extras.service';

@Component({
  selector: 'app-carrinho-produto',
  templateUrl: './carrinho-produto.component.html',
  styleUrl: './carrinho-produto.component.css',
})
export class CarrinhoProdutoComponent implements OnInit {
  allProdutos: Produto[] = [];
  produtos: Produto[] = [];
  produtosSelecionados: Produto[] = [];
  itemsCarrinho: CarrinhoEnvio[] = [];
  idFuncionario?: number;
  idVenda?: number;
  codEditVenda?: boolean;
  pesquisaText: string = '';
  loadingProdutos: boolean = false;

  faSearch = faSearch;

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idFuncionario = Number(this.route.snapshot.paramMap.get('id'));
    this.idVenda = Number(this.route.snapshot.paramMap.get('idVenda'));
    if (
      this.route.snapshot.paramMap.get('codEditVenda') &&
      Number(this.route.snapshot.paramMap.get('codEditVenda')) === 1
    ) {
      this.codEditVenda = true;
    } else {
      this.codEditVenda = false;
    }
    this.loadingProdutos = true;
    this.produtoService.listarProdutosCarrinhoAll().subscribe(response => {
      const data = response;
      this.allProdutos = data;
      this.produtos = data;
      this.loadingProdutos = false;
    });
  }

  procurar(e: Event): void {
    const target = e.target as HTMLInputElement;
    const value = FuncionalidadesExtrasService.removerAcentuacoes(target.value);

    this.produtos = this.allProdutos.filter(produto => {
      const nome = FuncionalidadesExtrasService.removerAcentuacoes(produto.nome);
      return nome.includes(value);
    });
  }

  selecionarProduto(produto: Produto) {
    produto.selecionado = !produto.selecionado;
  }
}
