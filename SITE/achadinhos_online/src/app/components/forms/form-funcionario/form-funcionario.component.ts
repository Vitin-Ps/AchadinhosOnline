import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
  styleUrl: './form-funcionario.component.scss',
})
export class FormFuncionarioComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Funcionario>();
  @Input() btnText!: string;

  funcionarioForm!: FormGroup;

  ngOnInit(): void {
    this.validaForm();
  }

  validaForm() {
    this.funcionarioForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      porcentagem: new FormControl('', [Validators.required]),
    });
  }
  sumbit() {
    if(this.funcionarioForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.funcionarioForm.value);
  }
}
