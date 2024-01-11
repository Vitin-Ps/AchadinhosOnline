package com.example.crudjava.repository;

import com.example.crudjava.domain.produto.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Page<Produto> findAllByAtivoTrue(Pageable pageable);

    Produto getReferenceByIdAndAtivoTrue(Long id);
}
