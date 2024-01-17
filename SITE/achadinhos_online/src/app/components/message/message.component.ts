import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ComunicacaoService } from '../../services/comunicacao.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  faTimes = faTimes;

  constructor(
    public messageService: MessageService,
    private comunicacaoService: ComunicacaoService
  ) {}

  acaoConfirm(acao: boolean) {
    if (acao) {
      this.comunicacaoService.emitFunction.emit();
      return;
    }
    this.messageService.clear();
  }
}
