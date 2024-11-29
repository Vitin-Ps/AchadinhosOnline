import { formatCurrency } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FuncionalidadesExtrasService {
  constructor() {}

  static removerAcentuacoes(texto: string): string {
    const mapaAcentos: Record<string, string> = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      ã: 'a',
      õ: 'o',
      â: 'a',
      ê: 'e',
      î: 'i',
      ô: 'o',
      û: 'u',
      à: 'a',
      è: 'e',
      ì: 'i',
      ò: 'o',
      ù: 'u',
      ä: 'a',
      ë: 'e',
      ï: 'i',
      ö: 'o',
      ü: 'u',
    };

    return texto
      .replace(
        /[áéíóúãõâêîôûàèìòùäëïöü]/g,
        (letra: string) => mapaAcentos[letra] || letra
      )
      .replace(/[^\w\s]/gi, '')
      .toLowerCase();
  }

  static moedaReal(valor: number): string {
    return formatCurrency(valor, 'pt-BR', 'R$');
  }
}
