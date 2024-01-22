import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagensService {
  mensagem: string = '';
  type: string = '';
  constructor() { }
  alert(mensagem: string) {
    this.type = 'alert';
    this.mensagem = mensagem;

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.mensagem = ''
  }

  confirm(mensagem: string) {
    this.type = 'confirm';
    this.mensagem = mensagem;
    console.log("chegou no confirm")
    setTimeout(() => {
      this.clear();
    }, 10000);
  }
}
