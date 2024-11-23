import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Produto } from '../../../interfaces/Produto';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
})
export class RadioComponent {
  produtos: Produto[] = [
    {
      id: 1,
      nome: 'camisa',
      valor: 100,
    },
    {
      id: 2,
      nome: 'sapato',
      valor: 25,
    },
  ];

  @ViewChildren('testeCards') testeCards!: QueryList<ElementRef>;

  escolherRadio(produto: Produto) {
    this.produtos.forEach((p) => (p.selecionado = false)); // Desmarca todos os outros produtos
    produto.selecionado = true; // Marca o produto clicado
  }

  labelClicada(produto: Produto, $event: MouseEvent) {
    // Aqui você pode adicionar a lógica que deseja ao clicar na label
    console.log(`Label clicada para o produto ${produto.nome}`);
    this.escolherRadio(produto);

    this.testeCards.forEach((container, index) => {
      const containerId = this.produtos[index].id;
      if (containerId == produto.id)
      container.nativeElement.classList.add('azul');
    else
    container.nativeElement.classList.remove('azul');
    });
  }
}
