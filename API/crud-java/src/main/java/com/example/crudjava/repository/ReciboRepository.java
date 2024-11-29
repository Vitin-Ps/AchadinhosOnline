package com.example.crudjava.repository;

import com.example.crudjava.domain.recibo.Recibo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReciboRepository extends JpaRepository<Recibo, Long> {
    List<Recibo> findAllByVendaId(Long id);
}
