import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { MensagensService } from '../../../services/mensagens.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Carrinho, CarrinhoEnvio } from '../../../interfaces/Carrinho';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ComunicacaoService } from '../../../services/comunicacao.service';
import { VendaDTO } from '../../../interfaces/Venda';

@Component({
  selector: 'app-cad-venda',
  templateUrl: './cad-venda.component.html',
  styleUrl: './cad-venda.component.css',
})
export class CadVendaComponent implements OnInit {
  idUrl!: number;

  faTrash = faTrash;

  funcionarios: Funcionario[] = [];
  funcionarioUrl: Funcionario | null = null;
  idFuncionarioSelecionado: number | null = null;
  step: number = 1;
  nomeCliente: string = '';

  itemsCarrinho: Carrinho[] = [];
  itemsCarrinhoNaoSelecionados: Carrinho[] = [];
  itemCarrinnhoExcluir: Carrinho | null = null;

  constructor(
    private vendaService: VendaService,
    private funcionarioService: FuncionarioService,
    private mensagemService: MensagensService,
    private carrinhoService: CarrinhoService,
    private comunicacaoService: ComunicacaoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idUrl = Number(this.route.snapshot.paramMap.get('id'));
    this.detalharFuncionario();
    !this.idUrl && this.listarFuncionarios();
    this.comunicacaoService.emitFunction.subscribe(() => {
      if (this.itemCarrinnhoExcluir != null) this.removerItemCarrinho();
    });
  }

  detalharFuncionario() {
    if (this.idUrl) {
      this.funcionarioService.detalharFuncionario(this.idUrl).subscribe(res => {
        this.funcionarioUrl = res;
      });
      this.listarCarrinho(this.idUrl);
    }
  }

  registrarVenda() {
    const itemsNaoSelecionados: CarrinhoEnvio[] = [];
    this.itemsCarrinhoNaoSelecionados.forEach(itemCarrinho => {
      if (itemCarrinho.quantidade !== 0) {
        const carrinhoEnvio: CarrinhoEnvio = {
          funcionarioId: itemCarrinho.funcionario.id!,
          produtoId: itemCarrinho.produto.id!,
          quantidade: itemCarrinho.quantidade,
        };

        itemsNaoSelecionados.push(carrinhoEnvio);
      }
    });

    this.carrinhoService.removeItemsNoCarrinho(itemsNaoSelecionados).subscribe(() => {
      const venda: VendaDTO = {
        funcionarioId: this.idUrl ? this.idUrl : this.idFuncionarioSelecionado!,
        nomeCliente: this.nomeCliente,
      };

      this.vendaService.registrarVenda(venda).subscribe(
        response => {
          console.log('Resposta do servidor:', response);
          this.mensagemService.alert(`Venda cadastrada com Sucesso!`);
          this.router.navigate(['/']);
        },
        error => {
          if (error.error) {
            this.mensagemService.alert(error.error);
          } else if (error.status === 0) {
            this.mensagemService.alert(
              'Erro: Não foi possível conectar à API. Verifique se a API está ligada.'
            );
          } else {
            this.mensagemService.alert('Erro desconhecido ao cadastrar funcionário.');
          }
        }
      );
    });
  }

  limparCarrinho(e: Event) {
    e.preventDefault();
    this.carrinhoService
      .limparCarrinho(this.idUrl ? this.idUrl : this.idFuncionarioSelecionado!)
      .subscribe(
        res => {
          if (this.router.url === '/vendas') {
            window.location.reload();
          } else {
            this.router.navigate(['vendas']);
          }
        },
        error => {
          this.mensagemService.alert(error.error);
        }
      );
  }

  listarFuncionarios() {
    this.funcionarioService.listarFuncionariosAll().subscribe(res => {
      this.funcionarios = res;
    });
  }

  listarCarrinho(idFuncionario: number) {
    this.carrinhoService.listarItemsAllPorIdFuncionario(idFuncionario).subscribe(res => {
      this.itemsCarrinho = res.map(item => ({ ...item }));
    });
  }

  selecionarFuncionario(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.idFuncionarioSelecionado = Number(value);
    this.listarCarrinho(this.idFuncionarioSelecionado);
    this.nomeCliente = '';
    this.step = 1;
  }

  alterarQuantidadeItem(idItem: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const value: number = Number(target.value);

    const itemCarrinhoOriginal = structuredClone(
      this.itemsCarrinho.find(itemCarrinhoOriginal => itemCarrinhoOriginal.produto.id === idItem)
    );

    if (itemCarrinhoOriginal) {
      if (
        !this.itemsCarrinhoNaoSelecionados.find(
          itemCarrinhoNaoSelecionado => itemCarrinhoNaoSelecionado.produto.id === idItem
        )
      ) {
        itemCarrinhoOriginal.quantidade -= value;
        this.itemsCarrinhoNaoSelecionados.push(itemCarrinhoOriginal);
      } else {
        this.itemsCarrinhoNaoSelecionados.forEach(itemCarrinho => {
          itemCarrinho.produto.id === idItem &&
            (itemCarrinho.quantidade = itemCarrinhoOriginal.quantidade - value);
        });
      }
    }
  }

  chamarComfirmExcluir(carrinho: Carrinho) {
    this.itemCarrinnhoExcluir = carrinho;
    this.mensagemService.confirm(
      `Tem certeza que quer excluir o Item \n ${carrinho.produto.nome} / quantidade ${carrinho.quantidade} do Carrinho?`
    );
  }

  removerItemCarrinho() {
    if (this.itemCarrinnhoExcluir) {
      this.carrinhoService
        .removeItemsNoCarrinho([
          {
            funcionarioId: this.itemCarrinnhoExcluir.funcionario.id!,
            produtoId: this.itemCarrinnhoExcluir.produto.id!,
            quantidade: this.itemCarrinnhoExcluir.quantidade,
          },
        ])
        .subscribe(res => {
          this.itemsCarrinho = res;
          this.itemCarrinnhoExcluir = null;
        });
    }
  }

  muadaEtapa(acao: boolean) {
    if (acao) {
      this.step += 1;
    } else {
      this.step -= 1;
    }
  }

  changeInputNomeCliente(e: Event) {
    const target = e.target as HTMLInputElement;
    this.nomeCliente = target.value;
  }
}
