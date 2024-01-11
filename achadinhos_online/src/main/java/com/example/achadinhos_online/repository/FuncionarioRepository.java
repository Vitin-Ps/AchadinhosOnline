package com.example.achadinhos_online.repository;

import com.example.achadinhos_online.domain.funcionario.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
