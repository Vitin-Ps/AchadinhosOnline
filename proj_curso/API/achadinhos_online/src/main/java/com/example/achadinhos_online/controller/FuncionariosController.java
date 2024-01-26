package com.example.achadinhos_online.controller;

import com.example.achadinhos_online.domain.funcionario.*;
import com.example.achadinhos_online.infra.exception.ValidacaoException;
import com.example.achadinhos_online.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/funcionarios")
public class FuncionariosController {
    @Autowired
    private FuncionarioRepository repository;
    private String message = "Funcionário não existe ou não está mais na Empresa";


    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastraFuncionario dados, UriComponentsBuilder componentsBuilder) {
        Funcionario funcionario = new Funcionario(dados);
        repository.save(funcionario);
        var uri = componentsBuilder.path("funcionarios/{id}").buildAndExpand(funcionario.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosDetalharFuncionario(funcionario));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemFuncionario>> listar(Pageable pageable) {
        Page<DadosListagemFuncionario> page = repository.findAllByAtivoTrue(pageable).map(DadosListagemFuncionario::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Valid DadosAtualizaFuncionario dados) {
        Funcionario funcionario = repository.getReferenceByIdAndAtivoTrue(dados.id());
        funcionario.alterar(dados);
        return ResponseEntity.ok( new DadosDetalharFuncionario(funcionario));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletarLogico(@PathVariable Long id) {
        var funcionario = repository.getReferenceByIdAndAtivoTrue(id);
        if (funcionario != null) funcionario.deletarLogico();
        else throw new ValidacaoException(message);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/del")
    @Transactional
    public ResponseEntity deletarDoDataBase(@PathVariable Long id) {
        if(!repository.existsByIdAndAtivoTrue(id)) throw new ValidacaoException(message);
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity detalhar(@PathVariable Long id) {
        var funcionario = repository.getReferenceByIdAndAtivoTrue(id);
        if (funcionario == null) throw new ValidacaoException(message);
        return ResponseEntity.ok(new DadosDetalharFuncionario(funcionario));
    }
}
