package com.example.crudjava.repository;

import com.example.crudjava.domain.estoque.Estoque;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {
    Estoque getReferenceByProdutoId(Long id);
}
