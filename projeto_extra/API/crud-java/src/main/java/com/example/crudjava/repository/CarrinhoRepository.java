package com.example.crudjava.repository;

import com.example.crudjava.domain.carrinho.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    List<Carrinho> findAllByFuncionarioIdAndCodEditVenda(Long funcionarioId, Boolean codEditVenda);

    List<Carrinho> findAllByFuncionarioIdAndProdutoIdAndCodEditVenda(Long FuncionarioId, Long ProdutoId, Boolean aBoolean);

    void deleteAllByFuncionarioIdAndProdutoIdAndCodEditVenda(Long aLong, Long aLong1, Boolean aBoolean);
}
