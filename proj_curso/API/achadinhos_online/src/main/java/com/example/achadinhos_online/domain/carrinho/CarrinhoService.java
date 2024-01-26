package com.example.achadinhos_online.domain.carrinho;

import com.example.achadinhos_online.domain.funcionario.Funcionario;
import com.example.achadinhos_online.domain.produto.Produto;
import com.example.achadinhos_online.infra.exception.ValidacaoException;
import com.example.achadinhos_online.repository.CarrinhoRepository;
import com.example.achadinhos_online.repository.FuncionarioRepository;
import com.example.achadinhos_online.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarrinhoService {
    @Autowired
    private CarrinhoRepository carrinhoRepository;
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    @Autowired
    private ProdutoRepository produtoRepository;

    public void addItem(List<DadosCarrinho> dadosList)  {
        for(DadosCarrinho dados: dadosList) {
            if(!funcionarioRepository.existsByIdAndAtivoTrue(dados.idFuncionario()) || !produtoRepository.existsByIdAndAtivoTrue(dados.idProduto())) throw new ValidacaoException("Produto ou Funcionário inexistentes!");
            Produto produto = produtoRepository.getReferenceByIdAndAtivoTrue(dados.idProduto());
            Funcionario funcionario = funcionarioRepository.getReferenceByIdAndAtivoTrue(dados.idFuncionario());
            Carrinho carrinho = new Carrinho(null , funcionario, produto);
            carrinhoRepository.save(carrinho);
        }
    }

    public void delItem(List<DadosCarrinho> dadosList) {
        for(DadosCarrinho dados: dadosList) {
            Carrinho carrinho = carrinhoRepository.findFirstByFuncionarioIdAndProdutoId(dados.idFuncionario(), dados.idProduto());
            if(carrinho == null) throw new ValidacaoException("Item não está mais no carrinho");
            carrinhoRepository.delete(carrinho);
        }
    }

    public void limparCarrinho(Long id) {
        int res = carrinhoRepository.deleteByFuncionarioId(id);
        if(res == 0) throw new ValidacaoException("Carrinho já está vazio!");
    }

    public List<DadosListagemCarrinho> listarCarrinho(Long id) {
        List<Carrinho> carrinhos = carrinhoRepository.findAllByFuncionarioId(id);
        return carrinhos.stream().map(DadosListagemCarrinho::new).collect(Collectors.toList());
    }


}
