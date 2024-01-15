import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faBars = faBars;

  constructor(private router: Router) {}
  sairSessao() {
    if (sessionStorage.getItem('token') != null)
      sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
