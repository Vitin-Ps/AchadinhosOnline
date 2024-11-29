package com.example.crudjava.controller;

import com.example.crudjava.domain.recibo.DadosListagemRecibo;
import com.example.crudjava.domain.recibo.ReciboService;
import com.example.crudjava.domain.venda.DadosAtualizaVenda;
import com.example.crudjava.domain.venda.DadosListagemVenda;
import com.example.crudjava.domain.venda.DadosResgistroVenda;
import com.example.crudjava.domain.venda.VendaService;
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
@RequestMapping("/vendas")
@CrossOrigin(origins = {"http://localhost:4200"})
public class VendaController {
    @Autowired
    private VendaService service;
    @Autowired
    private ReciboService reciboService;


    @PostMapping
    @Transactional
    public ResponseEntity registrarVenda(@RequestBody @Valid DadosResgistroVenda dados) {
        var dto = service.registrarVenda(dados);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<Page<DadosListagemVenda>> listarVendas(Pageable pageable) {
        var page = service.listarVendas(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Page<DadosListagemVenda>> listarVendasPorIdFuncionario(@PathVariable Long id, @PageableDefault(size = 10, page = 0, sort = {"funcionario_id"}) Pageable pageable) {
        var page = service.listarVendasPorIdFuncionario(id, pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/{id}/detalhar")
    public ResponseEntity listarVendasPorId(@PathVariable Long id) {
        var dto = service.listarVendasPorId(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping
    @Transactional
    public ResponseEntity atualizarVenda(@RequestBody @Valid DadosAtualizaVenda dados) {
        var dto = service.atualizaVenda(dados);
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity apagar(@PathVariable Long id) {
        service.excluirVenda(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/status")
    public ResponseEntity statusLojinha() {
        var dto = service.statusLojinha();
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/comissao")
    public ResponseEntity getComissoes() {
        var comissoes = service.getComissoes();
        return ResponseEntity.ok(comissoes);
    }

    @GetMapping("/recibo/{id}")
    public ResponseEntity<List<DadosListagemRecibo>> listReciboVenda(@PathVariable Long id) {
        List<DadosListagemRecibo> listRecibo = reciboService.listarReciboVenda(id);
        return ResponseEntity.ok(listRecibo);
    }

    @DeleteMapping("/recibo/{id}")
    @Transactional
    public ResponseEntity<List<DadosListagemRecibo>> delItemRecibo(@PathVariable Long id) {
        List<DadosListagemRecibo> listRecibo = reciboService.deleteItemRecibo(id);
        return ResponseEntity.ok(listRecibo);
    }

}
