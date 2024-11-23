package com.example.crudjava.domain.venda;

import com.example.crudjava.domain.carrinho.Carrinho;
import com.example.crudjava.domain.carrinho.CarrinhoService;
import com.example.crudjava.domain.estoque.Estoque;
import com.example.crudjava.domain.funcionario.DadosComissaoFuncionario;
import com.example.crudjava.domain.funcionario.Funcionario;
import com.example.crudjava.domain.recibo.Recibo;
import com.example.crudjava.infra.exception.ValidacaoException;
import com.example.crudjava.repository.*;
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
        if(!funcionarioRepository.existsById(dados.idFuncionario())) {
            throw new ValidacaoException("Funcionario não está cadastrado ou não está ativo!");
        }

        Funcionario funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.idFuncionario());

        if(funcionario == null) {
            throw new ValidacaoException("Funcionário não existe");
        }
        List<Carrinho> listaItemsCarrinho = carrinhoRepository.findAllByFuncionarioId(dados.idFuncionario());
        BigDecimal valorTotal = carrinhoService.calcularValorItems(listaItemsCarrinho);

        Venda venda = new Venda(funcionario, valorTotal, dados.nomeCliente());

        vendaRepository.save(venda);

        if(!listaItemsCarrinho.isEmpty()) {
            listaItemsCarrinho.forEach(itemCarrinho -> {
                Recibo recibo = new Recibo(itemCarrinho.getProduto(), venda, itemCarrinho.getQuantidade());
                reciboRepository.save(recibo);
            });
        }

        carrinhoService.limparCarrinho(dados.idFuncionario(), false);

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
        vendaRepository.deleteById(id);
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
//        List<Venda> listaDeVendas = vendaRepository.findAll();
//
//        // Agrupar as vendas pelo funcionário e calcular a soma dos valores e comissões para cada funcionário
//        Map<Funcionario, BigDecimal> somaValoresPorFuncionario = listaDeVendas.stream()
//                .collect(Collectors.groupingBy(Venda::getFuncionario,
//                        Collectors.reducing(BigDecimal.ZERO, Venda::getValor, BigDecimal::add)));
//
//        Map<Funcionario, BigDecimal> somaComissoesPorFuncionario = listaDeVendas.stream()
//                .collect(Collectors.groupingBy(Venda::getFuncionario,
//                        Collectors.reducing(BigDecimal.ZERO, Venda::getComissao, BigDecimal::add)));
//
//        return somaValoresPorFuncionario.entrySet().stream()
//                .map(entry -> new DadosComissaoFuncionario(entry.getKey().getId(), somaComissoesPorFuncionario.get(entry.getKey())))
//                .collect(Collectors.toList());

        return null;
    }

}
