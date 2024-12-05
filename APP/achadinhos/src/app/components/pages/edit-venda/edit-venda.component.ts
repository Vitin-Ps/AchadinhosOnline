import { Component, OnInit } from '@angular/core';
import { Venda, VendaDTO } from '../../../interfaces/Venda';
import { VendaService } from '../../../services/venda.service';
import { MensagensService } from '../../../services/mensagens.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrinho, CarrinhoEnvio } from '../../../interfaces/Carrinho';
import { Funcionario } from '../../../interfaces/Funcionario';
import { faChevronDown, faChevronUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FuncionarioService } from '../../../services/funcionario.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { ComunicacaoService } from '../../../services/comunicacao.service';
import { Recibo } from '../../../interfaces/Recibo';

@Component({
  selector: 'app-edit-venda',
  templateUrl: './edit-venda.component.html',
  styleUrl: './edit-venda.component.css',
})
export class EditVendaComponent implements OnInit {
  idUrl!: number;

  faTrash = faTrash;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  funcionarios: Funcionario[] = [];
  venda: Venda | null = null;
  funcionario: Funcionario | null = null;
  nomeCliente: string = '';

  itemsCarrinho: Carrinho[] = [];
  itemsCarrinhoNaoSelecionados: Carrinho[] = [];
  itemCarrinnhoExcluir: Carrinho | null = null;
  recibo: Recibo[] = [];

  descricaoRecibo: boolean = true;
  descricaoCarrinho: boolean = false;

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
    this.detalharVenda();
    this.comunicacaoService.emitFunction.subscribe(() => {
      if (this.itemCarrinnhoExcluir != null) this.removerItemCarrinho();
    });
  }

  detalharVenda() {
    if (this.idUrl) {
      this.vendaService.detalharVenda(this.idUrl).subscribe(res => {
        this.venda = res;
        this.funcionario = res.funcionario;
        this.listarCarrinho(res.funcionario.id!);
        this.nomeCliente = res.nomeCliente;
      });

      this.vendaService.listarRebicoPorVendaId(this.idUrl).subscribe(res => {
        this.recibo = res;
      });
    }
  }

  alterarVenda() {
    if (this.venda) {
      const itemsNaoSelecionados: CarrinhoEnvio[] = [];
      this.itemsCarrinhoNaoSelecionados.forEach(itemCarrinho => {
        if (itemCarrinho.quantidade !== 0) {
          const carrinhoEnvio: CarrinhoEnvio = {
            funcionarioId: itemCarrinho.funcionario.id!,
            produtoId: itemCarrinho.produto.id!,
            quantidade: itemCarrinho.quantidade,
            codEditVenda: true,
          };

          itemsNaoSelecionados.push(carrinhoEnvio);
        }
      });

      this.carrinhoService.removeItemsNoCarrinho(itemsNaoSelecionados).subscribe(() => {
        this.vendaService.alterarVenda(this.venda?.id!, this.nomeCliente).subscribe(
          response => {
            console.log('Resposta do servidor:', response);
            this.mensagemService.alert(`Venda alterada com Sucesso!`);
            this.router.navigate(['/home/vendas']);
          },
          error => {
            this.mensagemService.tratadorDeErro(error, error.error);
          }
        );
      });
    }
  }

  limparCarrinho(e: Event) {
    e.preventDefault();
    this.funcionario &&
      this.carrinhoService.limparCarrinho(this.funcionario.id!, true).subscribe(
        res => {
          window.location.reload();
        },
        error => {
          this.mensagemService.alert(error.error);
        }
      );
  }

  listarCarrinho(idFuncionario: number) {
    this.carrinhoService.listarItemsAllPorIdFuncionario(idFuncionario, true).subscribe(res => {
      this.itemsCarrinho = res.map(item => ({ ...item }));
    });
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
            codEditVenda: true,
          },
        ])
        .subscribe(res => {
          this.itemsCarrinho = res;
          this.itemCarrinnhoExcluir = null;
        });
    }
  }

  changeInputNomeCliente(e: Event) {
    const target = e.target as HTMLInputElement;
    this.nomeCliente = target.value;
  }

  excluirItemRecibo(idItemRecibo: number) {
    this.vendaService.deleteItemRecibo(idItemRecibo).subscribe(res => {
      this.recibo = res;
      res.length > 0 ? (this.venda = res[0].venda) : (this.venda = null);
    });
  }
}
