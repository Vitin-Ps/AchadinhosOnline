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
  btnText = 'Cadastrar';

  constructor(
    private prodService: ProdutoService,
    private mensagemService: MensagensService,
    private router: Router
  ) {}

  async cadastrarProduto(produto: Produto) {
    this.prodService.cadastraProduto(produto).subscribe(
      (response) => {
        this.mensagemService.alert(`${produto.nome} adicionado com sucesso!`);
        this.router.navigate(['/']);
      },
      (error) => {
         // Se ocorrer algum erro durante a requisição
         console.error('Erro na requisição:', error);
         if (error.status === 0) {
           // Status 0 geralmente indica falha na conexão
           this.mensagemService.alert("Erro: Não foi possível conectar à API. Verifique se a API está ligada.");
         } else {
           // Outros códigos de status
           this.mensagemService.alert("Erro desconhecido ao cadastrar Produto.");
         }
      }
    );
  }


}
