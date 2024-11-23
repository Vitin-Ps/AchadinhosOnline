import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Funcionario } from '../../../interfaces/Funcionario'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MensagensService } from '../../../services/mensagens.service'

@Component({
  selector: 'app-form-func',
  templateUrl: './form-func.component.html',
  styleUrl: './form-func.component.css',
})
export class FormFuncComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Funcionario>()
  @Input() btnText!: string
  @Input() funcData?: Funcionario

  funcionarioForm!: FormGroup
  loading: boolean = false

  constructor(private mensagensService: MensagensService) {}

  ngOnInit(): void {
    this.loading = false
    this.validaForm()
    this.loading = true
  }

  validaForm() {
    this.funcionarioForm = new FormGroup({
      id: new FormControl(this.funcData ? this.funcData.id : ''),
      nome: new FormControl(this.funcData ? this.funcData.nome : '', [Validators.required]),
      email: new FormControl(this.funcData ? this.funcData.email : '', [Validators.required]),
      porcentagem: new FormControl(this.funcData ? this.funcData.porcentagem : '', [
        Validators.required,
      ]),
      senha: new FormControl(
        '',
        this.funcData ? [Validators.nullValidator] : [Validators.required],
      ),
    })
  }

  get nome() {
    return this.funcionarioForm.get('nome')!
  }

  get email() {
    return this.funcionarioForm.get('email')!
  }

  get porcentagem() {
    return this.funcionarioForm.get('porcentagem')!
  }

  get senha() {
    return this.funcionarioForm.get('senha')!
  }

  sumbit() {
    if (this.funcionarioForm.invalid) {
      return
    }
    if (
      this.funcData != null &&
      this.funcData!.nome == this.nome.value &&
      this.funcData!.email == this.email.value &&
      this.funcData!.porcentagem == Number(this.porcentagem.value) &&
      this.senha.value == ''
    ) {
      this.mensagensService.alert(`Altere ao menos um dado de ${this.funcData.nome}!`)
      return
    }
    this.onSubmit.emit(this.funcionarioForm.value)
  }
}
