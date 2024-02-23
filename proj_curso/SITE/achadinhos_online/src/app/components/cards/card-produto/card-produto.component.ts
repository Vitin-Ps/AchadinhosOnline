import { Component, Input } from '@angular/core';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-produto',
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.scss',
})
export class CardProdutoComponent {
  @Input() nome: string = '';
  @Input() valor: number = 0;
  @Input() selecionado?: boolean = false;

  faMoneyBill = faMoneyBill;
}
