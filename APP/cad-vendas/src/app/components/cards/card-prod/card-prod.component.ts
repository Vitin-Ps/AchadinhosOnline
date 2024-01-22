import { Component, Input } from '@angular/core';
import { faBox, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-prod',
  templateUrl: './card-prod.component.html',
  styleUrl: './card-prod.component.css',
})
export class CardProdComponent {
  @Input() nome!: string;
  @Input() valor!: number;
  @Input() selecionado: boolean = false;
  @Input() imagem: string = '';

  faMoneyBill = faMoneyBill;
  faBox = faBox;
}
