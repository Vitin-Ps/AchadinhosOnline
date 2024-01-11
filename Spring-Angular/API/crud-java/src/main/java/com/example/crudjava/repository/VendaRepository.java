package com.example.crudjava.repository;

import com.example.crudjava.domain.venda.DadosStatusLojinha;
import com.example.crudjava.domain.venda.Venda;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VendaRepository extends JpaRepository<Venda, Long> {
    Page<Venda> findAllByFuncionarioId(Long id, Pageable pageable);


    @Query(nativeQuery = true, value = """
            SELECT
              (SELECT COUNT(*) FROM funcionarios),
              (SELECT COUNT(*) FROM produtos),
              (SELECT COUNT(*) FROM vendas);
            """)
    List<Object[]> recuperarStatusLojinha();
}
