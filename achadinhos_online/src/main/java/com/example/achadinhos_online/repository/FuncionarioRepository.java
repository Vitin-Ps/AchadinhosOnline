package com.example.achadinhos_online.repository;

import com.example.achadinhos_online.domain.funcionario.Funcionario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    Page<Funcionario> findAllByAtivoTrue(Pageable pageable);

    Funcionario getReferenceByIdAndAtivoTrue(Long id);
}
