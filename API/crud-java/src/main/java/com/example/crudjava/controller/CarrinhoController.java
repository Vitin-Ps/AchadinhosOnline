package com.example.crudjava.controller;

import com.example.crudjava.domain.carrinho.CarrinhoService;
import com.example.crudjava.domain.carrinho.DadosCarrinho;
import com.example.crudjava.domain.carrinho.DadosListagemCarrinho;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrinho")
@CrossOrigin(origins = {"http://localhost:4200"})
public class CarrinhoController {
    @Autowired
    private CarrinhoService service;

    @PostMapping
    @Transactional
    public ResponseEntity<List<DadosListagemCarrinho>> addCarrinho(@RequestBody @Valid List<DadosCarrinho> dadosList) {
        List<DadosListagemCarrinho> listaDados = service.addNoCarrinho(dadosList);
        return ResponseEntity.ok(listaDados);
    }


    @GetMapping("/{id}/{codEditVenda}")
    public ResponseEntity<List<DadosListagemCarrinho>> listarCarrinho(@PathVariable Long id, @PathVariable Boolean codEditVenda) {
        List<DadosListagemCarrinho> listaCarrinho = service.listarCarrinho(id, codEditVenda);
        return ResponseEntity.ok(listaCarrinho);
    }

    @DeleteMapping("/{id}/{codEditVenda}")
    @Transactional
    public ResponseEntity limparCarrinho(@PathVariable Long id, @PathVariable Boolean codEditVenda) {
        service.limparCarrinho(id, codEditVenda, true);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/remover")
    @Transactional
    public ResponseEntity<List<DadosListagemCarrinho>> removerItem(@RequestBody @Valid List<DadosCarrinho> dadosList) {
        List<DadosListagemCarrinho> listDados = service.removerItemDoCarrinho(dadosList);
        return ResponseEntity.ok(listDados);
    }
}
