import { Component } from '@angular/core';
import { VendaDTO } from '../../../interfaces/VendaDTO';
import { VendaService } from '../../../services/venda.service';
import { MessageService } from '../../../services/message.service';
import { ConversaoMoedaRealPipe } from '../../../pipes/conversao-moeda-real.pipe';
import { Router } from '@angular/router';
import { CarrinhoService } from '../../../services/carrinho.service';

@Component({
  selector: 'app-cad-venda',
  templateUrl: './cad-venda.component.html',
  styleUrl: './cad-venda.component.scss',
})
export class CadVendaComponent {
  constructor(
    private vendaService: VendaService,
    private messageService: MessageService,
    private carrinhoServie: CarrinhoService,
    private router: Router
  ) {}

  btnEnviar = 'Registrar';

  registrarVenda(venda: VendaDTO) {
    console.log("chegou", venda)
    this.vendaService.registrar(venda).subscribe(
      (res) => {
        this.carrinhoServie.limparCarrinho(venda.idFuncionario).subscribe();
        this.messageService.alert(`Venda no valor de R$${venda.valor}realizada com sucesso!`);
        this.router.navigate(['/'])

      },
      (error) => {
        this.messageService.alert("Falha ao registrar Venda");
      }
    );
  }
}
