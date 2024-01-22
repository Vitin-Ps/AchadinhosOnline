package com.example.crudjava.controller;

import com.example.crudjava.domain.carrinho.CarrinhoService;
import com.example.crudjava.domain.carrinho.DadosCarrinho;
import com.example.crudjava.domain.carrinho.DadosListagemCarrinho;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carrinho")
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.100.46:4200"})
public class CarrinhoController {
    @Autowired
    private CarrinhoService service;

    @PostMapping
    @Transactional
    public ResponseEntity addCarrinho(@RequestBody @Valid List<DadosCarrinho> dadosList) {
        System.out.println(dadosList);
        service.addNoCarrinho(dadosList);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Page<DadosListagemCarrinho>> listarCarrinho(@PathVariable Long id ,@PageableDefault(size = 10, page = 0) Pageable pageable) {
        var dto = service.listarCarrinho(id, pageable);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity limparCarrinho(@PathVariable Long id) {
        service.limparCarrinho(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/remover")
    @Transactional
    public ResponseEntity removerItem(@RequestBody @Valid List<DadosCarrinho> dadosList) {
        service.removerItemDoCarrinho(dadosList);
        return ResponseEntity.noContent().build();
    }
}
