package com.example.crudjava.repository;

import com.example.crudjava.domain.produto.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Page<Produto> findAllByAtivoTrue(Pageable pageable);
    List<Produto> findAllByAtivoTrue();

    Produto getReferenceByIdAndAtivoTrue(Long id);
}
