import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FuncionalidadesService } from '../../../services/funcionalidades.service';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../interfaces/Produto';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrinho } from '../../../interfaces/Carrinho';
import { MessageService } from '../../../services/message.service';
import { CarrinhoService } from '../../../services/carrinho.service';

@Component({
  selector: 'app-carrinho-produto',
  templateUrl: './carrinho-produto.component.html',
  styleUrl: './carrinho-produto.component.scss',
})
export class CarrinhoProdutoComponent implements OnInit {
  allProdutos: Produto[] = [];
  produtos: Produto[] = [];
  produtosSelecionados: Produto[] = [];
  itensCarrinho: Carrinho[] = [];
  idFuncionario!: number;

  faSearch = faSearch;

  constructor(
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private mensagensService: MessageService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idFuncionario = Number(this.route.snapshot.paramMap.get('id'));
    this.produtoService.listarAll().subscribe((item) => {
      this.allProdutos = item.content;
      this.produtos = this.allProdutos;
    });
  }

  procurar(e: Event) {
    const target = e.target as HTMLInputElement;
    const valor = FuncionalidadesService.removerAcentuacoes(target.value);

    this.produtos.filter((produto) => {
      const nome = FuncionalidadesService.removerAcentuacoes(produto.nome);
      return nome.includes(valor);
    });
  }

  marcarCheckbox(produto: Produto) {
    produto.selecionado = !produto.selecionado;
  }
  onSubmit() {
    this.produtosSelecionados = this.produtos.filter(
      (produto) => produto.selecionado
    );

    if (this.idFuncionario != undefined) {
      this.produtosSelecionados.forEach((produto) => {
        const itemCarrinho: Carrinho = {
          idFuncionario: this.idFuncionario,
          idProduto: produto.id!,
        };
        this.itensCarrinho.push(itemCarrinho);
      });
      this.carrinhoService.addItemCarrinho(this.itensCarrinho).subscribe(() => {
        this.router.navigate([`/vendas/${this.idFuncionario}`]).then(() => {
          window.location.reload();
        });
      });
    } else {
      this.mensagensService.alert('Id do Funcionário não passado!');
    }
  }
}
