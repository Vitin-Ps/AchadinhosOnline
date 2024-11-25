import { Component, Input } from '@angular/core';
import { CarrinhoService } from '../../../services/carrinho.service';
import { CarrinhoEnvio } from '../../../interfaces/Carrinho';
import { MensagensService } from '../../../services/mensagens.service';

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
  @Input() funcionarioId: number | undefined;
  @Input() produtoId!: number;

  novaQuantidade: number = this.quantidade !== 0 ? 1 : 0;

  constructor(
    private carrinhoService: CarrinhoService,
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
      this.carrinhoService.addItemNoCarrinho([itemCarrinho]).subscribe(() => {
        this.messagemService.alert(`${this.nome} adiciodado ao carrinho!`);
      });
    } else {
      this.messagemService.alert(`Funcionário não especificado. Cheque e a url`);
    }
  }
}
