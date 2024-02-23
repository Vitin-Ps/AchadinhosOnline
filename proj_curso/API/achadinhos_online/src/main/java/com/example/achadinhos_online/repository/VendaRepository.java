package com.example.achadinhos_online.repository;

import com.example.achadinhos_online.domain.venda.Venda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long> {
    Page<Venda> findAllByFuncionarioId(Pageable pageable, Long id);

    @Query(nativeQuery = true, value = """
           SELECT
           (SELECT COUNT(*) FROM funcionarios),
           (SELECT COUNT(*) FROM produtos),
           (SELECT COUNT(*) FROM vendas)
            """)
    List<Object[]> recuperarStatusLojinha();
}
