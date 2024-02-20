export function converterMoedaReal(number: number | undefined): string | undefined{
  if(number) return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(number);
  else return undefined
  
}

export function removerAcentuacoes(text: string): string {
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

  return text
    .replace(
      /[áéíóúãõâêîôûàèìòùäëïöü]/g,
      (letra: string) => mapaAcentos[letra] || letra,
    )
    .replace(/[^\w\s]/gi, '')
    .toLowerCase();
}

