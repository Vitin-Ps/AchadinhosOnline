import { Component } from '@angular/core';
import {
  faBox,
  faCartShopping,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  faUserTie = faUserTie;
  faCartShopping = faCartShopping;
  faBox = faBox;
}
