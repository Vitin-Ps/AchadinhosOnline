package com.example.crudjava.repository;

import com.example.crudjava.domain.recibo.Recibo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReciboRepository extends JpaRepository<Recibo, Long> {
}
