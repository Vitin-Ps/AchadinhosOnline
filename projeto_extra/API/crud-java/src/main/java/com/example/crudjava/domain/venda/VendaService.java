package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.carrinho.Carrinho;
import com.example.crudjava.domain.carrinho.CarrinhoService;
import com.example.crudjava.domain.funcionario.DadosComissaoFuncionario;
import com.example.crudjava.domain.funcionario.Funcionario;
import com.example.crudjava.domain.recibo.DadosListagemRecibo;
import com.example.crudjava.domain.recibo.DadosRegistroRecibo;
import com.example.crudjava.domain.recibo.Recibo;
import com.example.crudjava.infra.exception.ValidacaoException;
import com.example.crudjava.repository.CarrinhoRepository;
import com.example.crudjava.repository.FuncionarioRepository;
import com.example.crudjava.repository.ReciboRepository;
import com.example.crudjava.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ReciboRepository reciboRepository;


    @Autowired
    private CarrinhoService carrinhoService;

    public DadosDetalhamentoVenda registrarVenda(DadosResgistroVenda dados) {

        Funcionario funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.funcionarioId());

        if (funcionario == null) {
            throw new ValidacaoException("Funcionário não existe");
        }
        List<Carrinho> listaItemsCarrinho = carrinhoRepository.findAllByFuncionarioId(dados.funcionarioId());

        if (listaItemsCarrinho.isEmpty()) throw new ValidacaoException("Carrinho está vazio");

        BigDecimal valorTotal = carrinhoService.calcularValorItems(listaItemsCarrinho);

        Venda venda = new Venda(funcionario, valorTotal, dados.nomeCliente());

        vendaRepository.save(venda);

        if (!listaItemsCarrinho.isEmpty()) {
            List<DadosRegistroRecibo> dadosRecibo = listarCarrinhoRecibo(listaItemsCarrinho);
            dadosRecibo.forEach(itemCarrinho -> {
                Recibo recibo = new Recibo(itemCarrinho.produto(), venda, itemCarrinho.quantidade());
                reciboRepository.save(recibo);
            });
        }

        carrinhoService.limparCarrinho(dados.funcionarioId(), false);

        return new DadosDetalhamentoVenda(venda);
    }

    public Page<DadosListagemVenda> listarVendas(Pageable pageable) {
        return vendaRepository.findAll(pageable).map(DadosListagemVenda::new);
    }

    public Page<DadosListagemVenda> listarVendasPorIdFuncionario(Long id, Pageable pageable) {
        return vendaRepository.findAllByFuncionarioId(id, pageable).map(DadosListagemVenda::new);
    }

    public DadosDetalhamentoVenda listarVendasPorId(Long id) {
        return new DadosDetalhamentoVenda(vendaRepository.getReferenceById(id));
    }

    public DadosDetalhamentoVenda atualizaVenda(DadosAtualizaVenda dados) {
        var venda = vendaRepository.getReferenceById(dados.id());
        var funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.idFuncionario());
        venda.atualizarInformacoes(dados, funcionario);
        return new DadosDetalhamentoVenda(venda);
    }

    public void excluirVenda(Long id) {
        Venda venda = vendaRepository.getReferenceById(id);

        List<Recibo> listRecibo = reciboRepository.findAllByVendaId(id);

        for (Recibo recibo : listRecibo) {
            reciboRepository.delete(recibo);
        }

        vendaRepository.delete(venda);

    }

    public DadosStatusLojinha statusLojinha() {
        List<Object[]> dados = vendaRepository.recuperarStatusLojinha();

        if (dados != null && !dados.isEmpty() && dados.get(0).length == 3) {
            Object[] innerArray = dados.get(0);
            Long funcionarios = ((Number) innerArray[0]).longValue();
            Long produtos = ((Number) innerArray[1]).longValue();
            Long vendas = ((Number) innerArray[2]).longValue();

            return new DadosStatusLojinha(funcionarios, produtos, vendas);
        } else {
            throw new ValidacaoException("Não foi possivel recuperar os dados!!!");
        }
    }

    public List<DadosComissaoFuncionario> getComissoes() {
        List<Venda> listaDeVendas = vendaRepository.findAll();

        Map<Funcionario, BigDecimal[]> funcionariosVenda = listaDeVendas.stream()
                .collect(Collectors.groupingBy(
                        Venda::getFuncionario,
                        Collectors.reducing(
                                new BigDecimal[]{BigDecimal.ZERO, BigDecimal.ZERO},
                                venda -> new BigDecimal[]{venda.getValorTotal(), venda.getComissaoTotal()},
                                (valor, proxValor) -> new BigDecimal[]{
                                        valor[0].add(proxValor[0]),
                                        valor[1].add(proxValor[1])
                                }
                        )
                ));

        return funcionariosVenda.entrySet().stream()
                .map(entry -> new DadosComissaoFuncionario(
                        entry.getKey().getId(),
                        entry.getValue()[1]
                ))
                .collect(Collectors.toList());
    }

    public List<DadosListagemRecibo> listarReciboVenda(Long id) {
        return reciboRepository.findAllByVendaId(id).stream().map(DadosListagemRecibo::new).toList();
    }

    public List<DadosRegistroRecibo> listarCarrinhoRecibo(List<Carrinho> listCarrinho) {
        List<DadosRegistroRecibo> listCarrinhoRecibo = new ArrayList<>();

        if (!listCarrinho.isEmpty()) {
            for (Carrinho itemCarrinho : listCarrinho) {

                DadosRegistroRecibo itemExistente = listCarrinhoRecibo.stream().filter(dados -> dados.produto().getId().equals(itemCarrinho.getProduto().getId())).findFirst().orElse(null);

                if (itemExistente == null) {
                    listCarrinhoRecibo.add(new DadosRegistroRecibo(itemCarrinho, itemCarrinho.getQuantidade()));
                } else {
                    listCarrinhoRecibo.remove(itemExistente);
                    listCarrinhoRecibo.add(new DadosRegistroRecibo(itemCarrinho, itemExistente.quantidade() + itemCarrinho.getQuantidade()));
                }
            }
        }


        return listCarrinhoRecibo;
    }
}
