import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Produto } from '../../../interfaces/Produto';
import { ProdutoService } from '../../../services/produto.service';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ciclo-vida',
  templateUrl: './ciclo-vida.component.html',
  styleUrl: './ciclo-vida.component.css',
})
export class CicloVidaComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  allProdutos: Produto[] = [];
  produtos: Produto[] = [];
  allFuncionarios: Funcionario[] = [];
  funcionarios: Funcionario[] = [];
  produto!: Produto;
  prodForm!: FormGroup;

  constructor(
    private produtosService: ProdutoService,
    private funcService: FuncionarioService
  ) {}
  ngOnDestroy(): void {
    // console.log('ngOnDestroy');
  }
  ngAfterViewChecked(): void {
    // console.log("ngAfterViewChecked")
    // this.produtos = this.allProdutos;
    // this.funcionarios = this.allFuncionarios;
    // console.log(this.produtos);
    // console.log(this.funcionarios);
    // this.validaForm();
    // console.log('---------------------------');
  }
  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');
    // this.produtos = this.allProdutos;
    // this.funcionarios = this.allFuncionarios;
    // console.log(this.produtos);
    // console.log(this.funcionarios);
    // this.validaForm();
    // console.log('---------------------------');
  }
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked');
    if (this.allProdutos.length > 0) {
      console.log('Entrou no produtos');
      this.produto = this.allProdutos[0];
    }
      console.log('Entrou no Valida');
      this.validaForm();
    console.log(this.produtos);
    console.log('---------------------------');
  }
  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit ---------------------------');
    // this.produtos = this.allProdutos;
    // this.funcionarios = this.allFuncionarios;
    // console.log(this.produtos);
    // console.log(this.funcionarios);
    // this.validaForm();
    // console.log('---------------------------');
  }
  ngDoCheck(): void {
    // console.log('ngDoCheck');
    // this.produtos = this.allProdutos;
    // this.funcionarios = this.allFuncionarios;
    // console.log(this.produtos);
    // console.log(this.funcionarios);
    // this.validaForm();
  }
  ngOnInit(): void {
    console.log('ngOnInit');
    this.listarProdutos();
    this.listarFuncionarios();
    console.log(this.allProdutos);
    console.log(this.allFuncionarios);
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
  }

  async listarProdutos(): Promise<void> {
    await this.produtosService.listarProdutosAll().subscribe((item) => {
      this.allProdutos = item.content;
    });
  }

  listarFuncionarios() {
    this.funcService.listarFuncionariosAll().subscribe((item) => {
      this.allFuncionarios = item.content;
    });
  }

  validaForm() {
    this.prodForm = new FormGroup({
      nome: new FormControl(this.produto ? this.produto.nome : ''),
    });
  }

  async listarProdutos2(): Promise<Produto[]> {
    try {
      const item = await this.produtosService.listarProdutosAll().toPromise();
      return item!.content;
    } catch (error) {
      // Tratar erro, se necessário
      console.error('Erro ao listar produtos:', error);
      throw error; // Rejeitar a Promise com o erro
    }
  }
}
