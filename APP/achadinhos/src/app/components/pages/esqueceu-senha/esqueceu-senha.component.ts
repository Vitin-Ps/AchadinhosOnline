import { Component } from '@angular/core';
import { RawTokenService } from '../../../services/raw-token.service';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrl: './esqueceu-senha.component.css',
})
export class EsqueceuSenhaComponent {
  email: string = '';
  msgEmail: string | null = null;

  showLoading: boolean = false;

  constructor(private rawTokenService: RawTokenService) {}

  enviarEmail() {
    this.showLoading = true;
    this.rawTokenService.enviarEmailRecuperarSenha(this.email).subscribe(res => {
      this.msgEmail = res.message;
      this.showLoading = false;
    });
  }

  changeEmail(e: Event) {
    this.email = (e.target as HTMLInputElement).value;
  }
}
