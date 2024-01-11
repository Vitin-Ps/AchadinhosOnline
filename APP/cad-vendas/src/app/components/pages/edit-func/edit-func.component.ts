import { Component } from '@angular/core';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagensService } from '../../../services/mensagens.service';

@Component({
  selector: 'app-edit-func',
  templateUrl: './edit-func.component.html',
  styleUrl: './edit-func.component.css'
})
export class EditFuncComponent {
  btnText: string = 'Atualizar';
  funcionario!: Funcionario;

  constructor(
    private route: ActivatedRoute,
    private funcService: FuncionarioService,
    private mensagensService: MensagensService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.funcService.detalharFuncionario(id).subscribe((funcionario) => {
      this.funcionario = funcionario;
    });
  }
  
  submit(funcionario: Funcionario) {
    this.funcService.alteraFuncionario(funcionario).subscribe((response) => {
      console.log('Resposta Servidor: ' + response);
      this.mensagensService.alert(
        `Funcionário ${
          this.funcionario.nome
        } - ${this.funcionario.porcentagem}% Alterado para ${
          funcionario.nome
        } - ${funcionario.porcentagem}%`
      );
    });
      this.router.navigate(['/home/funcionarios']);
  }

}
