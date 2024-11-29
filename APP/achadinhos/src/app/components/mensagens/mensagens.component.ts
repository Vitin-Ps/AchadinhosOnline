import { Component, EventEmitter, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MensagensService } from '../../services/mensagens.service';
import { ComunicacaoService } from '../../services/comunicacao.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.css'
})
export class MensagensComponent {
  faTimes = faTimes;
  
  
  constructor(public mensagensService: MensagensService, private comunicacaoService: ComunicacaoService) {}
  
  acaoConfirm(acaoConfirm: boolean) {
    if(acaoConfirm) {
      this.comunicacaoService.emitFunction.emit();
    }
    this.mensagensService.clear();
  }
}
