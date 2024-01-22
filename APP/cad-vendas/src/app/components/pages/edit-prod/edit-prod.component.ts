import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../interfaces/Produto';
import { ProdutoService } from '../../../services/produto.service';
import { MensagensService } from '../../../services/mensagens.service';
import { FuncionalidadesExtrasService } from '../../../services/funcionalidades-extras.service';

@Component({
  selector: 'app-edit-prod',
  templateUrl: './edit-prod.component.html',
  styleUrl: './edit-prod.component.css',
})
export class EditProdComponent implements OnInit {
  btnText: string = 'Atualizar';
  produto!: Produto;

  constructor(
    private route: ActivatedRoute,
    private prodService: ProdutoService,
    private mensagensService: MensagensService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.prodService.detalharProduto(id).subscribe((produto) => {
      this.produto = produto;
    });
  }

  submit(produto: Produto) {
    const formData = new FormData();
    if(produto.imagem) {
      formData.append('arquivo', produto.imagem!);
    }
    delete produto.imagem
    const produtoJSON: string = JSON.stringify(produto);
    formData.append('dados', produtoJSON);

    this.prodService.alteraProduto(formData).subscribe((response) => {
      console.log('Resposta Servidor: ' + response);
      this.mensagensService.alert(
        `Produto ${
          this.produto.nome
        } - ${FuncionalidadesExtrasService.moedaReal(
          this.produto.valor
        )} Alterado para ${
          produto.nome
        } - ${FuncionalidadesExtrasService.moedaReal(produto.valor)}`
      );
      this.router.navigate(['/home/produtos']);
    });
  }
}
