import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moedaReal'
})
export class ConversaoMoedaReal implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  }
}
