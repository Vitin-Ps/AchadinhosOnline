package com.example.crudjava.controller;

import com.example.crudjava.domain.produto.*;
import com.example.crudjava.infra.FuncionalidadesService;
import com.example.crudjava.infra.file.ArquivoService;
import com.example.crudjava.repository.ProdutoRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.100.46:4200"})
public class ProdutoController {
    @Autowired
    private ProdutoRepository repository;
    @Autowired
    private ArquivoService arquivoService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping
    @Transactional
//    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroProduto dados, UriComponentsBuilder uriComponentsBuilder) {
    public ResponseEntity cadastrar(@RequestPart(value = "arquivo", required = false)MultipartFile arquivo, @RequestPart("dados") String dadosJson, UriComponentsBuilder uriComponentsBuilder) throws JsonProcessingException {
        DadosCadastroProduto dados = objectMapper.readValue(dadosJson, DadosCadastroProduto.class);
        FuncionalidadesService.validarRecord(dados);
        String arquivoUrl = null;
        if(arquivo != null) arquivoUrl = arquivoService.enviarArquivo(arquivo, null);
        var produto = new Produto(dados, arquivoUrl);
        repository.save(produto);
        var uri = uriComponentsBuilder.path("/produtos/{id}").buildAndExpand(produto.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosDetalhamentoProduto(produto));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListegemProduto>> listar(@PageableDefault(size = 10, page = 0, sort = {"nome"})Pageable pageable) {
        var page = repository.findAllByAtivoTrue(pageable).map(DadosListegemProduto::new);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
//    public ResponseEntity atualizar(@RequestBody @Valid DadosAtualizaProduto dados) {
    public ResponseEntity atualizar(@RequestPart(value = "arquivo", required = false)MultipartFile arquivo, @RequestPart("dados")String dadosJson) throws JsonProcessingException {
        DadosAtualizaProduto dados = objectMapper.readValue(dadosJson, DadosAtualizaProduto.class);
        FuncionalidadesService.validarRecord(dados);
        var produto = repository.getReferenceByIdAndAtivoTrue(dados.id());
        String arquivoUrl = null;
        if(arquivo != null)  {
            if(StringUtils.isBlank(produto.getImagem())) arquivoUrl = arquivoService.enviarArquivo(arquivo, null);
            else arquivoUrl = arquivoService.enviarArquivo(arquivo, FuncionalidadesService.extrairNomeArquivo(produto.getImagem()));
        }
        produto.atualizarInfo(dados, arquivoUrl);
        return ResponseEntity.ok(new DadosDetalhamentoProduto(produto));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluirLogico(@PathVariable Long id) {
        var produto = repository.getReferenceByIdAndAtivoTrue(id);
        produto.excluirLogico();
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{id}/del")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id) {
        Produto produto = repository.getReferenceByIdAndAtivoTrue(id);
        repository.deleteById(id);
        String arquivo = null;
        if(!StringUtils.isBlank(produto.getImagem())) arquivo = FuncionalidadesService.extrairNomeArquivo(produto.getImagem());
        if(arquivo != null) arquivoService.deletarArquivo(arquivo);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity detalhar(@PathVariable Long id) {
        var produto = repository.getReferenceByIdAndAtivoTrue(id);
        return ResponseEntity.ok(new DadosDetalhamentoProduto(produto));
    }
}
