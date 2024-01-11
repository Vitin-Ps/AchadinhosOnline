import { Component } from '@angular/core';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Router } from '@angular/router';
import { Funcionario } from '../../../interfaces/Funcionario';
import { MensagensService } from '../../../services/mensagens.service';

@Component({
  selector: 'app-cad-funcionario',
  templateUrl: './cad-funcionario.component.html',
  styleUrl: './cad-funcionario.component.css',
})
export class CadFuncionarioComponent {
  btnText = 'Cadastrar';

  constructor(
    private funcService: FuncionarioService,
    private mensagemService: MensagensService,
    private router: Router
  ) {}

  async cadastrarFuncionario(funcionario: Funcionario) {
    this.funcService.registraFuncionario(funcionario).subscribe(
      (response) => {
        console.log('Resposta do servidor:', response);
        this.mensagemService.alert(`Funcionário ${funcionario.nome} cadastrado com Sucesso!`);
        this.router.navigate(['/']);
      },
      (error) => {
        // Se ocorrer algum erro durante a requisição
        console.error('Erro na requisição:', error);
        if (error.status === 0) {
          // Status 0 geralmente indica falha na conexão
          this.mensagemService.alert("Erro: Não foi possível conectar à API. Verifique se a API está ligada.");
        } else {
          // Outros códigos de status
          this.mensagemService.alert("Erro desconhecido ao cadastrar funcionário.");
        }
      }
    );
  }
  
}
