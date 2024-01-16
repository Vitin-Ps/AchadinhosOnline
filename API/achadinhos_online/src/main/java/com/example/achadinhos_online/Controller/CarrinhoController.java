package com.example.achadinhos_online.Controller;

import com.example.achadinhos_online.domain.carrinho.CarrinhoService;
import com.example.achadinhos_online.domain.carrinho.DadosCarrinho;
import com.example.achadinhos_online.domain.carrinho.DadosListagemCarrinho;
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
@RequestMapping("carrinho")
public class CarrinhoController {
    @Autowired
    private CarrinhoService service;

    @PostMapping
    @Transactional
    public ResponseEntity addItem(@RequestBody @Valid List<DadosCarrinho> dadosList) {
        service.addItem(dadosList);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity delItem(@RequestBody @Valid List<DadosCarrinho> dadosList) {
        service.delItem(dadosList);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity listarCarrinhoPorFuncionario(@PathVariable Long id) {
        var dto = service.listarCarrinho(id);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity limparCarrinho(@PathVariable Long id) {
        service.limparCarrinho(id);
        return ResponseEntity.noContent().build();
    }

}
