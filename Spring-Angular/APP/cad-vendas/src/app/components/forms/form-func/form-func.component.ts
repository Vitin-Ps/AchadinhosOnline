import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MensagensService } from '../../../services/mensagens.service';

@Component({
  selector: 'app-form-func',
  templateUrl: './form-func.component.html',
  styleUrl: './form-func.component.css'
})
export class FormFuncComponent implements OnInit, AfterContentInit {
  @Output() onSubmit = new EventEmitter<Funcionario>();
  @Input() btnText!: string;
  @Input() funcData: Funcionario | null = null; // para atualização

  funcForm!: FormGroup;

  constructor(private mensagensService: MensagensService) {}
  

  ngOnInit(): void{
   this.validaForm()
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.validaForm();
    }, 100);
  }

  validaForm() {
    this.funcForm = new FormGroup({
      id: new FormControl(this.funcData ? this.funcData.id : ''),
      nome: new FormControl(this.funcData ? this.funcData.nome : '', [Validators.required]),
      email: new FormControl(this.funcData ? this.funcData.email : '', [Validators.required]),
      porcentagem: new FormControl(this.funcData ? this.funcData.porcentagem : '', [Validators.required])
    });
  }

  get nome() {
    return this.funcForm.get('nome')!
  }
  
  get email() {
    return this.funcForm.get('email')!
  }
  
  get porcentagem() {
    return this.funcForm.get('porcentagem')!
  }

  submit() {
    if(this.funcForm.invalid) {
      return;
    }
    if (
      this.funcData != null &&
      this.funcData!.nome == this.nome.value &&
      this.funcData!.email == this.email.value &&
      this.funcData!.porcentagem == Number(this.porcentagem.value)
    ) {
      this.mensagensService.alert(`Altere ao menos um dado de ${this.funcData.nome}!`);
      return;
    }
    this.onSubmit.emit(this.funcForm.value);
  }
}
