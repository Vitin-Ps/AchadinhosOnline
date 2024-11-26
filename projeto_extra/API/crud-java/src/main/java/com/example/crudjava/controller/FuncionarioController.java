package com.example.crudjava.controller;

import com.example.crudjava.domain.funcionario.*;
import com.example.crudjava.domain.usuario.TipoUsuario;
import com.example.crudjava.domain.usuario.Usuario;
import com.example.crudjava.repository.FuncionarioRepository;
import com.example.crudjava.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = {"http://localhost:4200"})
public class FuncionarioController {
    @Autowired
    private FuncionarioRepository repository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroFuncionario dados, UriComponentsBuilder uriComponentsBuilder) {
        var funcionario = new Funcionario(dados);
        repository.save(funcionario);

        String senhaCodificada = new BCryptPasswordEncoder().encode(dados.senha());
        Usuario usuario = new Usuario(dados.email(), senhaCodificada, TipoUsuario.FUNCIONARIO);
        usuarioRepository.save(usuario);

        var uri = uriComponentsBuilder.path("/funcionarios/{id}").buildAndExpand(funcionario.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosDetalhamentoFuncionario(funcionario));
    }

    @GetMapping
    public ResponseEntity<List<DadosListagemFuncionario>> listar() {
        var listaFunc = repository.findAllByAtivoTrue().stream().map(DadosListagemFuncionario::new).toList();
        return ResponseEntity.ok(listaFunc);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Valid DadosAtualizaFuncionario dados) {
        var funcionario = repository.getReferenceByIdAndAtivoTrue(dados.id());
        var usuario = usuarioRepository.getReferenceByLogin(funcionario.getEmail());
        funcionario.atualizarInfo(dados);

        String senhaCodificada = null;
        if (dados.senha() != null) senhaCodificada = new BCryptPasswordEncoder().encode(dados.senha());
        usuario.atualizarInfo(dados.email(), senhaCodificada);

        return ResponseEntity.ok(new DadosDetalhamentoFuncionario(funcionario));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluirLogico(@PathVariable Long id) {
        var funcionario = repository.getReferenceByIdAndAtivoTrue(id);
        funcionario.excluirLogico();
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}/del")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity detalhar(@PathVariable Long id) {
        var funcionario = repository.getReferenceByIdAndAtivoTrue(id);
        return ResponseEntity.ok(new DadosDetalhamentoFuncionario(funcionario));
    }
}
