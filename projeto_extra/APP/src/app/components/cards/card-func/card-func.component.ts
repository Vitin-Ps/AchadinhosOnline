import { Component, Input } from '@angular/core';
import { faMoneyBill, faPercent, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-func',
  templateUrl: './card-func.component.html',
  styleUrl: './card-func.component.css',
})
export class CardFuncComponent {
  @Input() nome!: string;
  @Input() comissao!: number;
  @Input() selecionado: boolean = false;
  @Input() porcentagem!: number;

  faUser = faUser;
  faMoneyBill = faMoneyBill;
  faPercent = faPercent;
}
