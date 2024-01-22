import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Login } from '../../../interfaces/Login';
import { Router } from '@angular/router';
import { MensagensService } from '../../../services/mensagens.service';

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
    private mensagensService: MensagensService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
    });
  }

  get login() {
    return this.loginForm.get('login')!;
  }
  get senha() {
    return this.loginForm.get('senha')!;
  }

  submit() {
    if (this.loginForm.invalid) {
      console.log('Formulário inválido. Abortando submit.');
      return;
    }
    const user: Login = { login: this.login.value, senha: this.senha.value };

    this.loginService.loginUser(user).subscribe(
      (token) => {
        sessionStorage.setItem('token', token.token);
        this.router.navigate(['/']);
      },
      (error) => {
        this.mensagensService.tratadorDeErro(error, error.error);
      }
    );
  }
}
