import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VendaDTO } from '../../../interfaces/VendaDTO';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';

@Component({
  selector: 'app-form-venda',
  templateUrl: './form-venda.component.html',
  styleUrl: './form-venda.component.scss',
})
export class FormVendaComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<VendaDTO>();
  vendaForm!: FormGroup;
  @Input() btnEnviar: string = '';
  funcionarios: Funcionario[] = [];
  funcionario?: Funcionario;
  idFuncionarioSelecionado: number | null = null;

  constructor(private funcionarioService: FuncionarioService) {}
  ngOnInit(): void {
    this.listarFuncionarios();
    this.validaForm();
  }

  listarFuncionarios() {
    this.funcionarioService.listarAll().subscribe((item) => {
      this.funcionarios = item.content;
    });
  }

  validaForm() {
    this.vendaForm = new FormGroup({
      id: new FormControl(''),
      idFuncionario: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
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
    const value = target.value
    this.idFuncionarioSelecionado = Number(value)
  }
}
