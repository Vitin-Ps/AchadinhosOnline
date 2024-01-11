package com.example.crudjava.domain.venda;

import com.example.crudjava.infra.exception.ValidacaoException;
import com.example.crudjava.repository.FuncionarioRepository;
import com.example.crudjava.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;
    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public DadosDetalhamentoVenda registrarVenda(DadosResgistroVenda dados) {
        if(!funcionarioRepository.existsById(dados.idFuncionario())) {
            throw new ValidacaoException("Funcionario não está cadastrado ou não está ativo!");
        }

        var funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.idFuncionario());
        var venda = new Venda(funcionario, dados.valor());

        vendaRepository.save(venda);
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


}
