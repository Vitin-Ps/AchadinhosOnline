import { Component, OnInit } from '@angular/core';
import { faAddressBook, faHandsHelping, faTShirt } from '@fortawesome/free-solid-svg-icons';
import { VendaService } from '../../../services/venda.service';
import { StatusLojinha } from '../../../interfaces/Venda';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {
  faAddressBook = faAddressBook
  faHandsHelping = faHandsHelping
  faTShirt = faTShirt
  btnText = "Ver"
  status!: StatusLojinha; 

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.vendaService.statusLojinha().subscribe((status) => {
      this.status = status;
    })
  }
}
