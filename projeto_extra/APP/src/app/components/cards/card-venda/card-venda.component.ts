import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faMoneyBill,
  faShoppingBag,
  faTrashAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Recibo } from '../../../interfaces/Recibo';
import { VendaService } from '../../../services/venda.service';

@Component({
  selector: 'app-card-venda',
  templateUrl: './card-venda.component.html',
  styleUrl: './card-venda.component.css',
})
export class CardVendaComponent {
  @Output() emitFunction = new EventEmitter<void>();
  @Input() id: number | undefined = undefined;
  @Input() nome: string = '';
  @Input() valorTotal: number = 0;
  @Input() comissao: number = 0;

  recibo: Recibo[] = [];

  faUser = faUser;
  faShoppingBag = faShoppingBag;
  faMoneyBill = faMoneyBill;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.id && this.listarRecibo(this.id);
  }

  listarRecibo(idVenda: number) {
    this.vendaService.listarRebicoPorVendaId(idVenda).subscribe(res => {
      this.recibo = res;
    });
  }

  ativarBtnExcluir() {
    this.emitFunction.emit();
  }

  descricaoEstado = 'closed'; // Estado inicial

  toggleDescricao() {
    this.descricaoEstado = this.descricaoEstado === 'closed' ? 'open' : 'closed';
  }
}
