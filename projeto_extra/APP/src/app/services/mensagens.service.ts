import { Injectable } from '@angular/core';
import { Response } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class MensagensService {
  mensagem: string = '';
  type: string = '';

  constructor() {}

  alert(mensagem: string) {
    this.type = 'alert';
    this.mensagem = mensagem;

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.mensagem = '';
  }

  confirm(mensagem: string) {
    this.type = 'confirm';
    this.mensagem = mensagem;
    setTimeout(() => {
      this.clear();
    }, 10000);
  }

  tratadorDeErro(error: any, errorData: { campo: string; mensagem: string }[] | string) {
    if (error.status === 401 && typeof errorData === 'string') {
      return this.alert(errorData);
    }

    if (error.status === 400 && Array.isArray(errorData)) {
      let mensagem = errorData.map(entry => entry.mensagem).join(' - ');

      this.alert(mensagem);
    }

    if (error.error) {
      this.alert(error.error);
    }
  }
}
