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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

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
    public ResponseEntity<List<DadosListagemProduto>> listar() {
        var listaProd = repository.findAllByAtivoTrue().stream().map(DadosListagemProduto::new).toList();
        return ResponseEntity.ok(listaProd);
    }

    @GetMapping("/carrinho")
    public ResponseEntity<List<DadosListagemProdutoCarrinho>> listarProdutosCarrinho() {

        var listaEstoque = estoqueRepository.findAll();

        var listaProd = repository.findAllByAtivoTrue().stream().map(produto -> {
            Estoque estoqueProduto = listaEstoque.stream()
                    .filter(estoque -> estoque.getProduto().getId().equals(produto.getId()))
                    .findFirst()
                    .orElse(null);

            return new DadosListagemProdutoCarrinho(produto, estoqueProduto.getQuantidade());
        }).toList();


        return ResponseEntity.ok(listaProd);
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

    @GetMapping("/carrinho/{id}")
    public ResponseEntity<DadosListagemProdutoCarrinho> detalharProdutoCarrinho(@PathVariable Long id) {
        Produto produto = repository.getReferenceByIdAndAtivoTrue(id);
        Estoque estoque = estoqueRepository.getReferenceByProdutoId(id);
        return ResponseEntity.ok(new DadosListagemProdutoCarrinho(produto, estoque.getQuantidade()));
    }

    @PostMapping("/estoque")
    @Transactional
    public ResponseEntity<DadosListagemProdutoCarrinho> alterarEstoque(@RequestBody @Valid DadosRegistroEstoque dados) {
        if (!repository.existsById(dados.produtoId())) {
            throw new ValidacaoException("Produto não existe");
        }
        Produto produto = repository.getReferenceByIdAndAtivoTrue(dados.produtoId());
        Estoque estoqueProduto = estoqueRepository.getReferenceByProdutoId(dados.produtoId());
        estoqueProduto.atualizarQuantidade(dados.quantidade(), dados.acao());
        return ResponseEntity.ok(new DadosListagemProdutoCarrinho(produto, estoqueProduto.getQuantidade()));
    }
}
