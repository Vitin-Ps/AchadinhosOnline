package com.example.crudjava.controller;

import com.example.crudjava.infra.file.ArquivoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("arquivos")
public class ArquivoController {

    @Autowired
    private ArquivoService service;

    @PostMapping
    public ResponseEntity<String> enviararquivo(@RequestPart("imagem")MultipartFile arquivo) {
        String urlArquivo = service.enviarArquivo(arquivo, true);
        return ResponseEntity.ok("Download bem Sucedido. Link: " + urlArquivo);
    }

    @GetMapping("/{nomeArquivo:.+}")
    public ResponseEntity<Resource> downloadArquivo(@PathVariable String nomeArquivo, HttpServletRequest request) throws IOException {
        return service.downloadArquivo(nomeArquivo, request);
    }
}
