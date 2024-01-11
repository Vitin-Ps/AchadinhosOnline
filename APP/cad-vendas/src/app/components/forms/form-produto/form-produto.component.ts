import {
  AfterContentInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Produto } from '../../../interfaces/Produto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MensagensService } from '../../../services/mensagens.service';

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.css',
})
export class FormProdutoComponent implements OnInit, AfterContentInit {
  @Output() onSubmit = new EventEmitter<Produto>();
  @Input() btnText!: string;
  @Input() prodData: Produto | null = null;

  prodForm!: FormGroup;

  constructor(private mensagensService: MensagensService) {}
  
  ngOnInit(): void {
    this.validaForm();
  }
  ngAfterContentInit(): void {
    setTimeout(() => {
      this.validaForm();
    }, 100);
  }

  validaForm() {
    this.prodForm = new FormGroup({
      id: new FormControl(this.prodData ? this.prodData.id : ''),
      nome: new FormControl(this.prodData ? this.prodData.nome : '', [
        Validators.required,
      ]),
      valor: new FormControl(this.prodData ? this.prodData.valor : '', [
        Validators.required,
      ]),
    });
  }

  get nome() {
    return this.prodForm.get('nome')!;
  }
  get valor() {
    return this.prodForm.get('valor')!;
  }

  submit() {
    if (this.prodForm.invalid) {
      return;
    }
    if (
      this.prodData != null &&
      this.prodData!.nome == this.nome.value &&
      this.prodData!.valor == Number(this.valor.value)
    ) {
      this.mensagensService.alert('Altere ao menos um dado do Produto');
      return;
    }
    this.onSubmit.emit(this.prodForm.value);
  }
}
