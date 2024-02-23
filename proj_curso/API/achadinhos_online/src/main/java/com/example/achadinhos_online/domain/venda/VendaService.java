package com.example.achadinhos_online.domain.venda;

import com.example.achadinhos_online.domain.funcionario.Funcionario;
import com.example.achadinhos_online.infra.exception.ValidacaoException;
import com.example.achadinhos_online.repository.FuncionarioRepository;
import com.example.achadinhos_online.repository.VendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VendaService {
    @Autowired
    private VendaRepository vendaRepository;
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    private List<String> messages = new ArrayList<>();

    public VendaService() {
        messages.add("Funcionário não Existe ou não está na empresa.");
        messages.add("Venda não Existe ou não está mais salva nos Dados.");
        System.out.println("entrou?");
    }

    public DadosDetalharVenda registrarVenda(DadosRegistraVenda dados) {
        if(!funcionarioRepository.existsByIdAndAtivoTrue(dados.idFuncionario())) throw new ValidacaoException(messages.get(0));
        Funcionario funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.idFuncionario());
        Venda venda = new Venda(funcionario, dados.valor());
        vendaRepository.save(venda);
        return new DadosDetalharVenda(venda);
    }

    public Page<DadosDetalharVenda> listarVenda(Pageable pageable) {
         return vendaRepository.findAll(pageable).map(DadosDetalharVenda::new);
    }

    public Page<DadosDetalharVenda> listarVendaPorFuncionario(Pageable pageable, Long id) {
        return vendaRepository.findAllByFuncionarioId(pageable, id).map(DadosDetalharVenda::new);
    }

    public DadosDetalharVenda atualizaVenda(DadosAtualizaVenda dados) {
        if(!funcionarioRepository.existsByIdAndAtivoTrue(dados.idFuncionario())) throw new ValidacaoException(messages.get(0));
        Venda venda = vendaRepository.getReferenceById(dados.id());
        Funcionario funcionario = funcionarioRepository.getReferenceById(dados.idFuncionario());
        venda.atualizarDados(funcionario);
        return new DadosDetalharVenda(venda);
    }

    public void excluirVenda(Long id) {
        if(!vendaRepository.existsById(id)) throw new ValidacaoException(messages.get(1));
        vendaRepository.deleteById(id);
    }

    public DadosStatusLojinha statusLojinha() {
        List<Object[]> dados = vendaRepository.recuperarStatusLojinha();
        if(dados != null && !dados.isEmpty() && dados.get(0).length == 3) {
            Object[] innerArray = dados.get(0);
            return new DadosStatusLojinha(((Number) innerArray[0]).longValue(), ((Number) innerArray[1]).longValue(), ((Number) innerArray[2]).longValue());
        } else {
            throw new ValidacaoException("Não foi possivel recuperar os dados");
        }
    }
}
