import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Produto } from '../../../interfaces/Produto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.scss'
})
export class FormProdutoComponent {
  @Output() onSubmit = new EventEmitter<Produto>();
  @Input() btnText!: string;

  produtoForm!: FormGroup;

  ngOnInit(): void {
    this.validaForm();
  }

  validaForm() {
    this.produtoForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      valor: new FormControl('', [Validators.required]),
    });
  }

  get nome(){
    return this.produtoForm.get('nome')!;
  }


  get valor(){
    return this.produtoForm.get('valor')!;
  }
  
  sumbit() {
    if(this.produtoForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.produtoForm.value);
  }
}
