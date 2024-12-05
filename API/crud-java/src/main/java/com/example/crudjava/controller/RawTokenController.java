package com.example.crudjava.controller;

import com.example.crudjava.domain.usuario.Usuario;
import com.example.crudjava.infra.FuncionalidadesService;
import com.example.crudjava.infra.email.DadosEnviarEmail;
import com.example.crudjava.infra.email.EmailService;
import com.example.crudjava.infra.rawToken.DadosRecuperaSenha;
import com.example.crudjava.infra.rawToken.TokenTransparenteService;
import com.example.crudjava.repository.UsuarioRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("token")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200"})
public class RawTokenController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenTransparenteService tokenTransparenteService;

    @Autowired
    private EmailService emailService;

    @PostMapping("/token-senha")
    public ResponseEntity<Map<String, String>> gerarTokenLogin(@RequestBody @Valid DadosRecuperaSenha dados) {
        Usuario usuario = usuarioRepository.getReferenceByLogin(dados.login());
        if (usuario != null) {
            String token = tokenTransparenteService.gerarToken(usuario);
            String mensagem = FuncionalidadesService.retornaMsgEmail(usuario.getNome(), token);
            emailService.enviarEmail(new DadosEnviarEmail(dados.login(), "Achadinhos: Link para recuperar senha", mensagem));
        }


        return ResponseEntity.ok(Map.of("message", "Seu o e-mail estiver correto, o código foi enviado com o link de recuperação para o seu e-mail."));
    }

    @GetMapping("verificar/{token}")
    public ResponseEntity verificaToken(@PathVariable String token) {
        tokenTransparenteService.validaToken(token);
        return ResponseEntity.ok().build();
    }
}
