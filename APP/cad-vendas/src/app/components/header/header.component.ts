import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  faBars = faBars;

  constructor(private router: Router) {}
  sairSessao() {
    TokenService.removeToken();
    this.router.navigate(['/']);
  }
}
