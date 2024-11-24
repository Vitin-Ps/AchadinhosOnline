package com.example.crudjava.controller;

import com.example.crudjava.domain.estoque.DadosRegistroEstoque;
import com.example.crudjava.domain.estoque.Estoque;
import com.example.crudjava.domain.produto.*;
import com.example.crudjava.infra.exception.ValidacaoException;
import com.example.crudjava.repository.EstoqueRepository;
import com.example.crudjava.repository.ProdutoRepository;
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
@CrossOrigin(origins = {"http://localhost:4200"})
public class ProdutoController {
    @Autowired
    private ProdutoRepository repository;

    @Autowired
    private EstoqueRepository estoqueRepository;

    @PostMapping
    @Transactional
    public ResponseEntity cadastrar(@RequestBody @Valid DadosCadastroProduto dados, UriComponentsBuilder uriComponentsBuilder) {
        Produto produto = new Produto(dados);
        repository.save(produto);

        Estoque estoqueProduto = new Estoque(produto, 0);
        estoqueRepository.save(estoqueProduto);

        var uri = uriComponentsBuilder.path("/produtos/{id}").buildAndExpand(produto.getId()).toUri();
        return ResponseEntity.created(uri).body(new DadosDetalhamentoProduto(produto));
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemProduto>> listar(@PageableDefault(size = 10, page = 0, sort = {"nome"})Pageable pageable) {
        var page = repository.findAllByAtivoTrue(pageable).map(DadosListagemProduto::new);
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
        produto.excluirLogico();
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
        var produto = repository.getReferenceByIdAndAtivoTrue(id);
        return ResponseEntity.ok(new DadosDetalhamentoProduto(produto));
    }

    @PostMapping("/estoque")
    @Transactional
    public ResponseEntity alterarEstoque(@RequestBody @Valid DadosRegistroEstoque dados) {
        if(!repository.existsById(dados.produtoId())) {
            throw new ValidacaoException("Produto não existe");
        }

        Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(dados.produtoId());
        estoqueProduto.atualizarQuantidade(dados.quantidade(), dados.acao());
        return ResponseEntity.ok().build();
    }
}
