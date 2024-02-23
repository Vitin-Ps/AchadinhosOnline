import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { StatusLojinha } from '../../../interfaces/Venda';
import {
  faHandsHelping,
  faTShirt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.scss',
})
export class HomeAdminComponent implements OnInit {
  status!: StatusLojinha;

  faUser = faUser;
  faTShirt = faTShirt;
  faHandsHelping = faHandsHelping;
  btnText: string = 'Mais';

  constructor(private vendaService: VendaService) {}
  ngOnInit(): void {
    this.vendaService.recuperarStatusLojinha().subscribe((dados) => {
      this.status = dados;
    });
  }
}
