package com.example.crudjava.repository;

import com.example.crudjava.domain.carrinho.Carrinho;
import com.example.crudjava.domain.carrinho.DadosListagemCarrinho;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {

    Carrinho findFirstByFuncionarioIdAndProdutoId(Long funcionarioId, Long produtoId);
    Page<DadosListagemCarrinho> findAllByFuncionarioId(Long funcionarioId, Pageable pageable);

    int deleteAllByFuncionarioId(Long funcionarioId);
}
