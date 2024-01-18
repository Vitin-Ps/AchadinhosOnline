package com.example.crudjava.controller;

import com.example.crudjava.domain.funcionario.*;
import com.example.crudjava.infra.file.ArquivoService;
import com.example.crudjava.repository.FuncionarioRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.100.46:4200"})
public class FuncionarioController {
    @Autowired
    private FuncionarioRepository repository;

    @Autowired
    private ArquivoService arquivoService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestPart("arquivo") MultipartFile arquivo, @RequestPart("json") String dadosString, UriComponentsBuilder uriComponentsBuilder) throws JsonProcessingException {
        DadosCadastroFuncionario dados = objectMapper.readValue(dadosString, DadosCadastroFuncionario.class);
        String imagem = arquivoService.enviarArquivo(arquivo, true);
        var funcionario = new Funcionario(dados, imagem);
        repository.save(funcionario);
        var uri = uriComponentsBuilder.path("/funcionarios/{id}").buildAndExpand(funcionario.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosDetalhamentoFuncionario(funcionario));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListegemFuncionario>> listar(@PageableDefault(size = 10, page = 0, sort = {"nome"})Pageable pageable) {
        var page = repository.findAllByAtivoTrue(pageable).map(DadosListegemFuncionario::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestPart("imagem") MultipartFile arquivo, @RequestPart("json") String dadosString) throws JsonProcessingException {
        DadosAtualizaFuncionario dados = objectMapper.readValue(dadosString, DadosAtualizaFuncionario.class);
        String imagem = arquivoService.enviarArquivo(arquivo, false);
        var funcionario = repository.getReferenceByIdAndAtivoTrue(dados.id());
        funcionario.atualizarInfo(dados, imagem);
        return ResponseEntity.ok(new DadosDetalhamentoFuncionario(funcionario));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluirLogico(@PathVariable Long id) {
        var funcionario = repository.getReferenceByIdAndAtivoTrue(id);
        funcionario.excluirLogico();
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{id}/apagar")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id) {
        var funcionario = repository.getReferenceByIdAndAtivoTrue(id);
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity detalhar(@PathVariable Long id) {
        var funcionario = repository.getReferenceByIdAndAtivoTrue(id);
        return ResponseEntity.ok(new DadosDetalhamentoFuncionario(funcionario));
    }
}
