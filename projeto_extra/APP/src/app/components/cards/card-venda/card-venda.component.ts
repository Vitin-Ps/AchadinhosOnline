import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faEdit,
  faMoneyBill,
  faShoppingBag,
  faTrashAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-venda',
  templateUrl: './card-venda.component.html',
  styleUrl: './card-venda.component.css',
})
export class CardVendaComponent {
  @Output() emitFunction = new EventEmitter<void>();
  @Input() id: string = '';
  @Input() nome: string = '';
  @Input() valorTotal: number = 0;
  @Input() comissao: number = 0;

  faUser = faUser;
  faShoppingBag = faShoppingBag;
  faMoneyBill = faMoneyBill;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  ativarBtnExcluir() {
    this.emitFunction.emit();
  }
}
