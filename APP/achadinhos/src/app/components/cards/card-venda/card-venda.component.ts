import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faChevronDown,
  faChevronUp,
  faEdit,
  faMoneyBill,
  faShoppingBag,
  faTrashAlt,
  faUser,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';
import { Recibo } from '../../../interfaces/Recibo';
import { VendaService } from '../../../services/venda.service';
import { FuncionalidadesExtrasService } from '../../../services/funcionalidades-extras.service';

@Component({
  selector: 'app-card-venda',
  templateUrl: './card-venda.component.html',
  styleUrl: './card-venda.component.css',
})
export class CardVendaComponent {
  @Output() emitFunction = new EventEmitter<void>();
  @Input() id: number | undefined = undefined;
  @Input() nomeCliente: string = '';
  @Input() nomeFuncionario: string = '';
  @Input() valorTotal: number = 0;
  @Input() comissaoTotal: number = 0;
  @Input() dateCreated?: string;

  recibo: Recibo[] = [];

  faUser = faUser;
  faUserTie = faUserTie;
  faShoppingBag = faShoppingBag;
  faMoneyBill = faMoneyBill;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.id && this.listarRecibo(this.id);
    this.dateCreated &&
      (this.dateCreated = FuncionalidadesExtrasService.formatarData(new Date(this.dateCreated)));
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
