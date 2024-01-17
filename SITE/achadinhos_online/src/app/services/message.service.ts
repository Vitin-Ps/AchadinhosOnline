import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message: string = '';
  type: string = '';

  constructor() {}

  alert(message: string) {
    this.type = 'alert';
    this.message = message;

    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  confirm(message: string) {
    this.type = 'confirm';
    this.message = message;

    console.log('entrou no confirm');

    setTimeout(() => {
      this.clear();
    }, 10000);
  }

  clear() {
    this.message = '';
  }
}
