import { Component, OnInit } from '@angular/core';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cad-funcionario',
  templateUrl: './cad-funcionario.component.html',
  styleUrl: './cad-funcionario.component.scss',
})
export class CadFuncionarioComponent {
  btnText: string = 'Cadastrar';
  constructor(
    private funcionarioService: FuncionarioService,
    private messageService: MessageService,
    private router: Router
  ) {}

  registraFuncionario(funcionario: Funcionario) {
    console.log('Chegou : ', funcionario);
    this.funcionarioService.registrar(funcionario).subscribe(
      (res) => {
        funcionario = res;
        this.messageService.alert(
          `Funcionário ${funcionario.nome} cadastrado com sucesso!`
        );
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Erro: ', error);
      }
    );
  }
}
