import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { MensagensService } from '../../../services/mensagens.service';
import { TokenService } from '../../../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrl: './recuperar-senha.component.css',
})
export class RecuperarSenhaComponent {
  recuperarSenhaForm!: FormGroup;
  rawToken: string | null = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private mensagensService: MensagensService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rawToken = this.route.snapshot.paramMap.get('tokenTransparent');
    this.recuperarSenhaForm = new FormGroup({
      senha: new FormControl('', [Validators.required]),
      novaSenha: new FormControl('', [Validators.required]),
    });
  }

  get senha() {
    return this.recuperarSenhaForm.get('senha')!;
  }
  get novaSenha() {
    return this.recuperarSenhaForm.get('novaSenha')!;
  }

  submit() {
    if (this.recuperarSenhaForm.invalid) {
      console.log('Formulário inválido. Abortando submit.');
      return;
    }

    if (!this.senha.value || !this.novaSenha.value || !this.rawToken) {
      this.mensagensService.alert('Preencha todos os campos');
      return;
    }

    this.loginService
      .recuperarSenha(this.senha.value, this.novaSenha.value, this.rawToken!)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        error => {
          this.mensagensService.tratadorDeErro(error, error.error);
        }
      );
  }
}
