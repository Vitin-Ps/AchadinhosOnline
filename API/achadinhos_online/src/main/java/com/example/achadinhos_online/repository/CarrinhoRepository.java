package com.example.achadinhos_online.repository;

import com.example.achadinhos_online.domain.carrinho.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    Carrinho findFirstByFuncionarioIdAndProdutoId(Long idFuncionario, Long idProduto);

    int deleteByFuncionarioId(Long idFuncionario);

    List<Carrinho> findAllByFuncionarioId(Long id);
}
