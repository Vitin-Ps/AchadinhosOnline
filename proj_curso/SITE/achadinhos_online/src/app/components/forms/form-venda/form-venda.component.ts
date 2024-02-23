import {
  AfterContentChecked,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendaDTO } from '../../../interfaces/Venda';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from '../../../services/carrinho.service';
import { Carrinho } from '../../../interfaces/Carrinho';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-form-venda',
  templateUrl: './form-venda.component.html',
  styleUrl: './form-venda.component.scss',
})
export class FormVendaComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<VendaDTO>();
  @Input() btnEnviar: string = '';
  funcionarios: Funcionario[] = [];
  funcionario?: Funcionario;
  itensCarrinho: Carrinho[] = [];
  idFuncionarioSelecionado: number | null = null;
  loading: boolean = false;

  vendaForm!: FormGroup;

  constructor(
    private funcionarioService: FuncionarioService,
    private carrinhoService: CarrinhoService,
    private mensagemService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = false;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.listarFuncionarios();
    this.validaForm();
    if (id) {
      this.idFuncionarioSelecionado = id;
      this.listarCarrinho(id);
      this.funcionario = this.funcionarios.find(
        (funcionario) => funcionario.id === this.idFuncionarioSelecionado
      );
      this.idFuncionario.setValue(id);
      console.log('está chegando');
    }
    this.loading = true;
  }

  listarFuncionarios() {
    this.funcionarioService.listarAll().subscribe((item) => {
      this.funcionarios = item.content;
    });
  }

  listarCarrinho(id: number) {
    this.carrinhoService.listarItensPorFuncionarioId(id).subscribe((itens) => {
      this.itensCarrinho = itens;
      let valorTotal: number = 0;
      if (this.itensCarrinho) {
        this.itensCarrinho.forEach((item) => {
          valorTotal += item.valor!;
        });
      }
      this.valor.setValue(valorTotal);
    });
  }

  validaForm() {
    let valorTotal: number = 0;
    if (this.itensCarrinho) {
      this.itensCarrinho.forEach((item) => {
        valorTotal += item.valor!;
      });
    }
    this.vendaForm = new FormGroup({
      id: new FormControl(this.funcionario ? this.funcionario.id : ''),
      idFuncionario: new FormControl(
        this.funcionario ? this.funcionario.id : '',
        [Validators.required]
      ),
      valor: new FormControl(valorTotal != 0 ? valorTotal : '', [
        Validators.required,
      ]),
    });
  }

  get idFuncionario() {
    return this.vendaForm.get('idFuncionario')!;
  }

  get valor() {
    return this.vendaForm.get('valor')!;
  }

  submit() {
    if (this.vendaForm.invalid) return;
    this.onSubmit.emit(this.vendaForm.value);
  }

  selecionarFuncionario(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.idFuncionarioSelecionado = Number(value);
    this.listarCarrinho(this.idFuncionarioSelecionado!);
  }

  limparCarrinho(e: Event) {
    e.preventDefault();
    this.carrinhoService
      .limparCarrinho(this.idFuncionarioSelecionado!)
      .subscribe(
        (res) => {
          window.location.reload();
        },
        (error) => {
          this.mensagemService.alert('Carrinho já está vazio.');
        }
      );
  }
}
