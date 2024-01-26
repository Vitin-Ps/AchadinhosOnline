package com.example.achadinhos_online.controller;

import com.example.achadinhos_online.domain.venda.DadosAtualizaVenda;
import com.example.achadinhos_online.domain.venda.DadosDetalharVenda;
import com.example.achadinhos_online.domain.venda.DadosRegistraVenda;
import com.example.achadinhos_online.domain.venda.VendaService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vendas")
public class VendaController {
    @Autowired
    private VendaService service;

    @PostMapping
    @Transactional
    public ResponseEntity registrar(@RequestBody @Valid DadosRegistraVenda dados) {
        DadosDetalharVenda dto = service.registrarVenda(dados);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<Page<DadosDetalharVenda>> listar(Pageable pageable) {
        Page<DadosDetalharVenda> page = service.listarVenda(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Page<DadosDetalharVenda>> listarPorFuncionario(@PathVariable Long id ,Pageable pageable) {
        Page<DadosDetalharVenda> page = service.listarVendaPorFuncionario(pageable, id);
        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizar(@RequestBody @Valid DadosAtualizaVenda dados) {
        DadosDetalharVenda dto = service.atualizaVenda(dados);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity deletar(@PathVariable Long id) {
        service.excluirVenda(id);
        return ResponseEntity.noContent().build();
    }

}
