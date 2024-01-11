import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { MensagensService } from '../../../services/mensagens.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendaDTO } from '../../../interfaces/Venda';

@Component({
  selector: 'app-cad-venda',
  templateUrl: './cad-venda.component.html',
  styleUrl: './cad-venda.component.css',
})
export class CadVendaComponent implements OnInit{
  btnText: string = 'Registrar';
  type: string = 'create'
  idUrl!: number;

  constructor(
    private vendaService: VendaService,
    private mensagemService: MensagensService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.idUrl = Number(this.route.snapshot.paramMap.get('id'));
  }

  registrarVenda(venda: VendaDTO) {
    console.log('chegou aqui');
    console.log(venda);
    this.vendaService.registrarVenda(venda).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);
        this.mensagemService.alert(`Venda cadastrada com Sucesso!`);
        this.carrinhoService.limparCarrinho(venda.idFuncionario).subscribe();
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erro na requisição:', error);
        if (error.status === 0) {
          this.mensagemService.alert(
            'Erro: Não foi possível conectar à API. Verifique se a API está ligada.'
          );
        } else {
          this.mensagemService.alert(
            'Erro desconhecido ao cadastrar funcionário.'
          );
        }
      }
    );
  }
}
