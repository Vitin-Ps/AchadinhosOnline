import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../interfaces/Funcionario';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from '../../../services/carrinho.service';
import { Carrinho } from '../../../interfaces/Carrinho';
import { MensagensService } from '../../../services/mensagens.service';
import { Venda, VendaDTO } from '../../../interfaces/Venda';
import { VendaService } from '../../../services/venda.service';

@Component({
  selector: 'app-form-venda',
  templateUrl: './form-venda.component.html',
  styleUrl: './form-venda.component.css',
})
export class FormVendaComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<VendaDTO>();
  @Input() btnEnviar: string = '';
  @Input() venda!: Venda;
  @Input() idUrl!: number;
  @Input() type!: string;

  funcionarios: Funcionario[] = [];
  funcionario?: Funcionario;
  itensCarrinho: Carrinho[] = [];
  idFuncionarioSelecionado: number | null = null;
  loading: boolean = false;

  vendaForm!: FormGroup;

  constructor(
    private funcionarioService: FuncionarioService,
    private carrinhoService: CarrinhoService,  
    private mensagemService: MensagensService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loading = false;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.funcionarioService.listarFuncionariosAll().subscribe(item => {
      this.funcionarios = item.content;
      this.validaForm();
      if (id && this.type === 'create') {
        this.idFuncionarioSelecionado = id;
        this.listarCarrinho(id).subscribe(itens => {
          this.itensCarrinho = itens.content;
          let valorTotal: number = 0;
          if (this.itensCarrinho) {
            this.itensCarrinho.forEach(item => {
              valorTotal += item.produto.valor!;
            });
          }
          this.valor.setValue(valorTotal);
        });
        this.funcionario = this.funcionarios.find(
          funcionario => funcionario.id === this.idFuncionarioSelecionado,
        );
        this.idFuncionario.setValue(id);
      }
      this.loading = true;
    });
  }

  listarCarrinho(id: number) {
    return this.carrinhoService.listarItemsAllPorIdFuncionario(id);
  }

  validaForm() {
    this.vendaForm = new FormGroup({
      id: new FormControl(this.venda ? this.venda.funcionario.id : ''),
      idFuncionario: new FormControl(
        this.venda ? this.venda.funcionario.id : this.funcionario ? this.funcionario.id : '',
        [Validators.required],
      ),
      valor: new FormControl(this.venda ? this.venda.venda : '', [Validators.required]),
      // valor: new FormControl('', [Validators.required]),
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
    this.listarCarrinho(this.idFuncionarioSelecionado!).subscribe(itens => {
      this.itensCarrinho = itens.content;
      let valorTotal: number = 0;
      if (this.itensCarrinho) {
        this.itensCarrinho.forEach(item => {
          valorTotal += item.produto.valor!;
        });
      }
      this.valor.setValue(valorTotal);
    });
  }

  limparCarrinho(e: Event) {
    e.preventDefault();
    this.carrinhoService.limparCarrinho(this.idFuncionarioSelecionado!).subscribe(
      res => {
        window.location.reload();
      },
      error => {
        this.mensagemService.alert('Carrinho já está vazio.');
      },
    );
  }
}
