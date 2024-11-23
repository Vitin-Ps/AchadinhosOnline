import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Login } from '../../../interfaces/Login';
import { Router } from '@angular/router';
import { MensagensService } from '../../../services/mensagens.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private mensagensService: MensagensService,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      lembrar: new FormControl(false),
    });
  }

  get login() {
    return this.loginForm.get('login')!;
  }
  get senha() {
    return this.loginForm.get('senha')!;
  }
  get lembrar() {
    return this.loginForm.get('lembrar')!;
  }

  submit() {
    if (this.loginForm.invalid) {
      console.log('Formulário inválido. Abortando submit.');
      return;
    }
    const user: Login = { login: this.login.value, senha: this.senha.value };

    this.loginService.loginUser(user).subscribe(
      (token) => {
        this.tokenService.removeToken();
        // sessionStorage.setItem('token', token.token);
        this.tokenService.setToken(token.token, this.lembrar.value);
        this.router.navigate(['/']);
      },
      (error) => {
        this.mensagensService.tratadorDeErro(error, error.error);
      }
    );
  }
}
