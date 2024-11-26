import { Component, Input, Output } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho.service';
import { CarrinhoEnvio } from '../../../interfaces/Carrinho';
import { MensagensService } from '../../../services/mensagens.service';
import { EventEmitter } from 'node:stream';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-card-item-carrinho',
  templateUrl: './card-item-carrinho.component.html',
  styleUrl: './card-item-carrinho.component.css',
})
export class CardItemCarrinhoComponent {
  @Input() id: number = 0;
  @Input() nome: string = '';
  @Input() valor: number = 0;
  @Input() quantidade!: number;
  @Input() loading: boolean = false;
  @Input() funcionarioId: number | undefined;
  @Input() produtoId!: number;

  novaQuantidade: number = this.quantidade !== 0 ? 1 : 0;

  constructor(
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService,
    private messagemService: MensagensService
  ) {}

  alterarQuantidadeItem(idItem: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const value: number = Number(target.value);

    this.novaQuantidade = value;
  }

  addCarrinho() {
    if (this.funcionarioId) {
      const itemCarrinho: CarrinhoEnvio = {
        funcionarioId: this.funcionarioId,
        produtoId: this.produtoId,
        quantidade: this.novaQuantidade,
      };
      this.carrinhoService.addItemsNoCarrinho([itemCarrinho]).subscribe(() => {
        this.messagemService.alert(`${this.nome} adicionado ao carrinho!`);
        this.loading = true;
        this.quantidade = 0;
        this.produtoService.detalharProdutoCarrinho(this.produtoId).subscribe(produto => {
          if (produto.quantidade && produto.quantidade > 0) {
            this.quantidade = produto.quantidade;
            this.novaQuantidade = 1;
          } else {
            this.quantidade = 0;
            this.novaQuantidade = 0;
          }

          this.loading = false;
        });
      });
    } else {
      this.messagemService.alert(`Funcionário não especificado. Cheque e a url`);
    }
  }
}
