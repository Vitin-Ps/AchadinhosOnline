package com.example.achadinhos_online.Controller;

import com.example.achadinhos_online.domain.produto.*;
import com.example.achadinhos_online.infra.exception.ValidacaoException;
import com.example.achadinhos_online.repository.ProdutoRepository;
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
@RequestMapping("/produtos")
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.100.46:4200"})
public class ProdutoController {
    @Autowired
    private ProdutoRepository repository;

    private String message = "Produto não existe ou não está mais disponível";
    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroProduto dados, UriComponentsBuilder uriComponentsBuilder) {
        var produto = new Produto(dados);
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
    public ResponseEntity atualizar(@RequestBody @Valid DadosAtualizaProduto dados) {
        var produto = repository.getReferenceByIdAndAtivoTrue(dados.id());
        produto.atualizarInfo(dados);
        return ResponseEntity.ok(new DadosDetalhamentoProduto(produto));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity excluirLogico(@PathVariable Long id) {
        var produto = repository.getReferenceByIdAndAtivoTrue(id);
        if (produto != null) produto.deletarLogico();
        else throw new ValidacaoException(message);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("/{id}/del")
    @Transactional
    public ResponseEntity excluir(@PathVariable Long id) {
        if(!repository.existsByIdAndAtivoTrue(id)) throw new ValidacaoException(message);
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity detalhar(@PathVariable Long id) {
        var produto = repository.getReferenceByIdAndAtivoTrue(id);
        if (produto == null) throw new ValidacaoException(message);
        return ResponseEntity.ok(new DadosDetalhamentoProduto(produto));
    }
}
