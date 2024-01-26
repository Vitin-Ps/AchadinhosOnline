import { Component } from '@angular/core';
import { Produto } from '../../../interfaces/Produto';
import { ProdutoService } from '../../../services/produto.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrl: './cad-produto.component.scss',
})
export class CadProdutoComponent {
  btnText: string = 'Cadastrar';
  
  constructor(private produtoService: ProdutoService, private router: Router, private messageService: MessageService) {}
  
  registraProduto(produto: Produto) {
    this.produtoService.registrar(produto).subscribe(
      (res) => {
        produto = res;
        this.messageService.alert(
          `Produto ${produto.nome} cadastrado com sucesso!`
        );
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Erro: ', error);
      }
    );
  }
}
