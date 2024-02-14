import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionalidadesService {

  constructor() { }

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
  static converterMoedaReal(number: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(number);
  }
}

