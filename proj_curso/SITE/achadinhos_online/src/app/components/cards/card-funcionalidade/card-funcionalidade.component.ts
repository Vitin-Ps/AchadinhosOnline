import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-funcionalidade',
  templateUrl: './card-funcionalidade.component.html',
  styleUrl: './card-funcionalidade.component.scss'
})
export class CardFuncionalidadeComponent {
@Input() icon!: IconDefinition;
@Input() titulo!: string;
@Input() link!: string;
@Input() btnText!: string;

}
