import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicacaoService {
  emitFunction = new EventEmitter();
  constructor() { }
}
