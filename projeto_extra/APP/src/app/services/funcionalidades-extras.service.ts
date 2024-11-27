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
      .replace(/[áéíóúãõâêîôûàèìòùäëïöü]/g, (letra: string) => mapaAcentos[letra] || letra)
      .replace(/[^\w\s]/gi, '')
      .toLowerCase();
  }

  static moedaReal(valor: number): string {
    return formatCurrency(valor, 'pt-BR', 'R$');
  }

  static formatarData(date: Date) {
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  static getDateComparativa(date: string): Date {
    const dateString = date.split('T')[0];
    const [year, month, day] = dateString.split('-').map(Number);

    const dateCreated = new Date();
    dateCreated.setFullYear(year);
    dateCreated.setMonth(month - 1);
    dateCreated.setDate(day);
    dateCreated.setHours(0, 0, 0, 0);

    return dateCreated;
  }
}
