import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Produto } from '../../../interfaces/Produto'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MensagensService } from '../../../services/mensagens.service'

@Component({
  selector: 'app-form-produto',
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.css',
})
export class FormProdutoComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Produto>()
  @Input() btnText!: string
  @Input() prodData?: Produto

  produtoForm!: FormGroup
  loading: boolean = false

  constructor(private mensagensService: MensagensService) {}

  ngOnInit(): void {
    this.loading = false
    this.validaForm()
    this.loading = true
  }

  validaForm() {
    this.produtoForm = new FormGroup({
      id: new FormControl(this.prodData ? this.prodData.id : ''),
      nome: new FormControl(this.prodData ? this.prodData.nome : '', [Validators.required]),
      valor: new FormControl(this.prodData ? this.prodData.valor : '', [Validators.required]),
    })
  }

  get nome() {
    return this.produtoForm.get('nome')!
  }

  get valor() {
    return this.produtoForm.get('valor')!
  }

  submit() {
    if (this.produtoForm.invalid) {
      return
    }
    if (
      this.prodData != null &&
      this.prodData!.nome == this.nome.value &&
      this.prodData!.valor == Number(this.valor.value)
    ) {
      this.mensagensService.alert('Altere ao menos um dado do Produto')
      return
    }
    this.onSubmit.emit(this.produtoForm.value)
  }
}
