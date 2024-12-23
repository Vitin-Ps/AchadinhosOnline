package com.example.crudjava.repository;

import ch.qos.logback.core.testUtil.MockInitialContext;
import com.example.crudjava.domain.funcionario.Funcionario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Page<Funcionario> findAllByAtivoTrue(Pageable pageable);
    List<Funcionario> findAllByAtivoTrue();

    Funcionario getReferenceByIdAndAtivoTrue(Long id);
}
