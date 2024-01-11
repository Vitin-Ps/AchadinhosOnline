import { Component } from '@angular/core';
import { faBox, faShoppingCart, faUserTie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faUserTie = faUserTie
  faShoppingCart = faShoppingCart
  faBox = faBox
}
