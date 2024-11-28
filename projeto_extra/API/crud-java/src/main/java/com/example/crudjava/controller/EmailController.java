package com.example.crudjava.controller;

import com.example.crudjava.infra.email.DadosEnviarEmail;
import com.example.crudjava.infra.email.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/enviar")
    public String enviarEmail(@RequestBody @Valid DadosEnviarEmail dados) {
        try {
            emailService.enviarEmail(dados);
            return "E-mail enviado com sucesso!";
        } catch (Exception e) {
            return "Erro ao enviar e-mail: " + e.getMessage();
        }
    }


}

