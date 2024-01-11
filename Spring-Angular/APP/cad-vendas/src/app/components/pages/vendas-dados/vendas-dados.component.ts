import { Component, OnInit } from '@angular/core';
import { Venda } from '../../../interfaces/Venda';
import { VendaService } from '../../../services/venda.service';
import { ComunicacaoService } from '../../../services/comunicacao.service';
import { MensagensService } from '../../../services/mensagens.service';

@Component({
  selector: 'app-vendas-dados',
  templateUrl: './vendas-dados.component.html',
  styleUrl: './vendas-dados.component.css',
})
export class VendasDadosComponent implements OnInit {
  vendasTotal: Venda[] = [];
  vendas: Venda[] = [];
  totalVendas: Venda[] = [];
  idFuncSelecionario: number = 0;
  idVendaSelecionada: number = 0;
  totalVendasDoFuncionario: {
    vendas: number;
    valorTotal: number;
    comissao: number;
  } | null = null;

  constructor(
    private vendaService: VendaService,
    private comunicacaoService: ComunicacaoService,
    private mensagemService: MensagensService,
  ) {}

  ngOnInit(): void {
    this.vendaService.listarVendas().subscribe((item) => {
      const data = item.content;
      this.vendasTotal = data;
      this.vendas = data;
      this.agruparVendasPorFuncionario();
      this.calcularDadosFuncionario();
      this.comunicacaoService.emitFunction.subscribe(() => {
        if(this.idVendaSelecionada != 0) this.removerVenda();
      });
    });
  }
  agruparVendasPorFuncionario() {
    /*
    set(key, value): Adiciona um par chave-valor ao Map.
    get(key): Retorna o valor associado à chave ou  undefined se a chave não existir.
    has(key): Verifica se uma chave está presente no Map.
    delete(key): Remove a entrada associada à chave.
    clear(): Remove todas as entradas do Map.
    keys(): Retorna um iterador com as chaves do Map.
    values(): Retorna um iterador com os valores do Map.
    entries(): Retorna um iterador com os pares chave-valor do Map.
    */
    const mapaVendas: Map<string, Venda> = new Map();

    this.vendasTotal.forEach((venda) => {
      const key = venda.funcionario.nome;

      if (mapaVendas.has(key)) {
        const vendaExistente = mapaVendas.get(key);

        // Mesclar valores para o funcionário existente
        vendaExistente!.venda += venda.venda;
        vendaExistente!.comissao! += venda.comissao!;
      } else {
        // Adicionar nova entrada no mapa
        // os ... são usados para criar uma cópia do objeto antes de manda-lo para o Map
        mapaVendas.set(key, { ...venda });
      }
    });

    // Converter o mapa de volta para um array
    this.totalVendas = Array.from(mapaVendas.values());
  }

  calcularDadosFuncionario() {
    if (this.idFuncSelecionario != 0) {
      this.vendas = this.vendasTotal.filter(
        (venda) => venda.funcionario.id === this.idFuncSelecionario
      );
    } else {
      this.vendas = this.vendasTotal;
    }
    let vendas: number = 0;
    let comissao: number = 0;
    let valorTotal: number = 0;

    this.vendas.forEach((venda) => {
      vendas++;
      comissao += venda.comissao!;
      valorTotal += venda.venda;
    });

    this.totalVendasDoFuncionario = {
      vendas: vendas,
      valorTotal: valorTotal,
      comissao: comissao,
    };
  }

  selecionarFuncionario(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.idFuncSelecionario = Number(value);
    this.calcularDadosFuncionario();
  }

  async removerVenda() {
    await this.vendaService.excluirVenda(this.idVendaSelecionada).subscribe(() => {
      this.idVendaSelecionada = 0;
      window.location.reload();
    });
  }

  chamarConfirm(id: number) {
    console.log('chegou aqui: ' + id);
    this.idVendaSelecionada = id;
    this.mensagemService.confirm("Tem certeza que quer excluir essa venda?");
  }
}
