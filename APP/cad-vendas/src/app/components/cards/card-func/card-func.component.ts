import { Component, Input } from '@angular/core';
import { faMoneyBill, faPercent } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-func',
  templateUrl: './card-func.component.html',
  styleUrl: './card-func.component.css'
})
export class CardFuncComponent {
  @Input() nome!: string;
  @Input() valor!: number;
  @Input() selecionado: boolean = false;
  @Input() porcentagem!: number;

  faMoneyBill = faMoneyBill;
  faPercent = faPercent
}
