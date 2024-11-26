import { Component, OnInit } from '@angular/core';
import { VendaService } from '../../../services/venda.service';
import { MensagensService } from '../../../services/mensagens.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Venda, VendaDTO } from '../../../interfaces/Venda';
import { Funcionario } from '../../../interfaces/Funcionario';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Carrinho } from '../../../interfaces/Carrinho';
import { identifierName } from '@angular/compiler';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Produto } from '../../../interfaces/Produto';
import { ComunicacaoService } from '../../../services/comunicacao.service';

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

  itemsCarrinho: Carrinho[] = [];
  itemsCarrinhoFiltrado: Carrinho[] = [];
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

  registrarVenda(venda: VendaDTO) {
    this.vendaService.registrarVenda(venda).subscribe(
      response => {
        console.log('Resposta do servidor:', response);
        this.mensagemService.alert(`Venda cadastrada com Sucesso!`);
        this.carrinhoService.limparCarrinho(venda.idFuncionario).subscribe();
        this.router.navigate(['/']);
      },
      error => {
        console.error('Erro na requisição:', error);
        if (error.status === 0) {
          this.mensagemService.alert(
            'Erro: Não foi possível conectar à API. Verifique se a API está ligada.'
          );
        } else {
          this.mensagemService.alert('Erro desconhecido ao cadastrar funcionário.');
        }
      }
    );
  }

  limparCarrinho(e: Event) {
    e.preventDefault();
    this.carrinhoService
      .limparCarrinho(this.idUrl ? this.idUrl : this.idFuncionarioSelecionado!)
      .subscribe(
        res => {
          this.router.navigate(['vendas']);
        },
        error => {
          this.mensagemService.alert('Carrinho já está vazio.');
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
      this.itemsCarrinhoFiltrado = res.map(item => ({ ...item }));
    });
  }

  selecionarFuncionario(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.idFuncionarioSelecionado = Number(value);
    this.listarCarrinho(this.idFuncionarioSelecionado);
  }

  alterarQuantidadeItem(idItem: number, e: Event) {
    const target = e.target as HTMLInputElement;
    const value: number = Number(target.value);

    this.itemsCarrinhoFiltrado.forEach(itemCarrinho => {
      itemCarrinho.id === idItem && (itemCarrinho.quantidade = value);
    });
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
}
