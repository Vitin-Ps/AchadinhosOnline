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
  pesquisaText: string = '';
  loadingProdutos: boolean = false;

  faSearch = faSearch;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private carrinhoService: CarrinhoService,
    private mensagemService: MensagensService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idFuncionario = Number(this.route.snapshot.paramMap.get('id'));
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

  onSubmit(): void {
    this.produtosSelecionados = this.produtos.filter(produto => produto.selecionado);
    if (this.idFuncionario != null) {
      console.log(this.itemsCarrinho);
      this.produtosSelecionados.forEach(produto => {
        const carrinho: CarrinhoEnvio = {
          funcionarioId: this.idFuncionario!,
          produtoId: Number(produto.id),
        };
        this.itemsCarrinho.push(carrinho);
      });
      this.carrinhoService.addItemsNoCarrinho(this.itemsCarrinho).subscribe(() => {
        this.router.navigate([`/vendas/${this.idFuncionario}`]).then(() => {
          window.location.reload();
        });
      });
    } else {
      this.mensagemService.alert('Id do Funcionário não foi passado!');
    }
  }
}
