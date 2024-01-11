import { Component, ElementRef, Renderer2, ViewChild, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-manipulacao-div',
  templateUrl: './manipulacao-div.component.html',
  styleUrls: ['./manipulacao-div.component.css'],
})
export class ManipulacaoDivComponent implements OnInit{
  @ViewChild('minhaDiv') minhaDiv!: ElementRef;

  constructor(private renderer: Renderer2) {}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.verificarAltura()
    },10)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.verificarAltura();
  }

  adicionarClasseEObterAltura() {
    this.renderer.addClass(this.minhaDiv.nativeElement, 'minha-classe-adicional');

    setTimeout(() => {
      this.renderer.removeClass(this.minhaDiv.nativeElement, 'minha-classe-adicional');
    }, 4000);

    this.verificarAltura();
  }

  verificarAltura() {
    const alturaDaDiv = this.minhaDiv.nativeElement.offsetHeight;

    if (alturaDaDiv > 500) {
      this.renderer.setStyle(this.minhaDiv.nativeElement, 'background-color', 'red');
    } else {
      this.renderer.removeStyle(this.minhaDiv.nativeElement, 'background-color');
    }

    console.log('Altura da div:', alturaDaDiv);
  }
}
