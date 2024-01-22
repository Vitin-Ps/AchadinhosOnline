import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-funcionalidade',
  templateUrl: './card-funcionalidade.component.html',
  styleUrl: './card-funcionalidade.component.css'
})
export class CardFuncionalidadeComponent {
  @Input() icone!: IconDefinition;
  @Input() titulo: string = '';
  @Input() btnText: string = '';
  @Input() link: string = '';

}
