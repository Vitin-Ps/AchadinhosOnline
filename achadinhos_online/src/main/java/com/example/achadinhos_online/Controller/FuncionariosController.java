package com.example.achadinhos_online.Controller;

import com.example.achadinhos_online.domain.funcionario.DadosCadastraFuncionario;
import com.example.achadinhos_online.domain.funcionario.DadosDetalharFuncionario;
import com.example.achadinhos_online.domain.funcionario.Funcionario;
import com.example.achadinhos_online.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/funcionarios")
public class FuncionariosController {
    @Autowired
    private FuncionarioRepository repository;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastraFuncionario dados, UriComponentsBuilder componentsBuilder) {
        Funcionario funcionario = new Funcionario(dados);
        repository.save(funcionario);
        var uri = componentsBuilder.path("funcionarios/{id}").buildAndExpand(funcionario.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosDetalharFuncionario(funcionario));
    }
}
