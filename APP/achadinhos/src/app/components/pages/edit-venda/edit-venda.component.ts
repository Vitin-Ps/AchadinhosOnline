import { Component, OnInit } from '@angular/core';
import { Venda, VendaDTO } from '../../../interfaces/Venda';
import { VendaService } from '../../../services/venda.service';
import { MensagensService } from '../../../services/mensagens.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-venda',
  templateUrl: './edit-venda.component.html',
  styleUrl: './edit-venda.component.css',
})
export class EditVendaComponent implements OnInit{
  btnText = 'Finalizar';
  type = 'edit';
  venda!: Venda;
  idUrl!: number;
  loading: boolean = false;

  constructor(
    private vendaService: VendaService,
    private mensagemService: MensagensService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.idUrl = Number(this.route.snapshot.paramMap.get('id'));
    this.vendaService.detalharVenda(this.idUrl).subscribe((venda) => {
      this.venda = venda;
    });
  }

  alterarVenda(venda: VendaDTO) {
    console.log(venda);
    this.vendaService.alterarVenda(venda).subscribe(
      (response) => {
        console.log('resposta do servidor: ' + response);
        this.mensagemService.alert('Funcionário alterado com sucesso!');
        this.router.navigate(["/home/vendas"]);
      },
      (error) => {
        this.mensagemService.alert('Error: ' + error);
      }
    );
  }

  // transferirCarrinho(e: Event) {
  //   e.preventDefault();
  //   const venda: VendaDTO = {
  //     id: this.idUrl,
  //     idFuncionario: this.funcionarioSelecionado!,
  //     valor: this.venda.venda,
  //   };
  //   console.log(venda);
  //   this.vendaService.alterarVenda(venda).subscribe(
  //     (response) => {
  //       console.log('resposta do servidor: ' + response);
  //       this.mensagemService.alert('Funcionário alterado com sucesso!');
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 1000);
  //     },
  //     (error) => {
  //       this.mensagemService.alert('Error: ' + error);
  //     }
  //   );
  // }
}
