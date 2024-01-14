package com.example.achadinhos_online.repository;

import com.example.achadinhos_online.domain.produto.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    Page<Produto> findAllByAtivoTrue(Pageable pageable);

    Produto getReferenceByIdAndAtivoTrue(Long id);

    boolean existsByIdAndAtivoTrue(Long id);
}
