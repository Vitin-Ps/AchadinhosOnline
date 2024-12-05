import { Component } from '@angular/core';
import { ProdutoService } from '../../../services/produto.service';
import { MensagensService } from '../../../services/mensagens.service';
import { Router } from '@angular/router';
import { Produto } from '../../../interfaces/Produto';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrl: './cad-produto.component.css',
})
export class CadProdutoComponent {
  btnText: string = 'Cadastrar';
  
  constructor(private produtoService: ProdutoService, private router: Router, private menssagemService: MensagensService) {}
  
  registraProduto(produto: Produto) {
    this.produtoService.cadastraProduto(produto).subscribe(
      (res) => {
        produto = res;
        this.menssagemService.alert(
          `Produto ${produto.nome} cadastrado com sucesso!`
        );
        this.router.navigate(['/']);
      },
      (error) => {
        this.menssagemService.tratadorDeErro(error, error.error);
      }
    );
  }
}
