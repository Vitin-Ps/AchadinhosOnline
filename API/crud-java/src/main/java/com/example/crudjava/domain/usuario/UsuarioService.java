package com.example.crudjava.domain.usuario;

import com.example.crudjava.infra.exception.ValidacaoException;
import com.example.crudjava.infra.rawToken.TokenTransparenteService;
import com.example.crudjava.infra.security.TokenService;
import com.example.crudjava.repository.UsuarioRepository;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private TokenTransparenteService tokenTransparenteService;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private TokenService tokenService;


    @SneakyThrows
    public void alterarSenha(DadosAlteracaoSenha dados) {
        var publicData = tokenTransparenteService.readPublicData(dados.rawToken());

        if (tokenTransparenteService.tempoExpirado(publicData)) throw new ValidacaoException("Token Expirado");

        Usuario usuario = usuarioRepository.getReferenceById(publicData.idusuario());

        var tokenService = tokenTransparenteService.getInstanceFor(usuario);
        tokenService.verifyToken(dados.rawToken());
        if (!dados.novaSenha().equals(dados.confirmaSenha())) throw new ValidacaoException("Senhas não são iguais.");
        var novaSenhaCodificada = new BCryptPasswordEncoder().encode(dados.novaSenha());
        usuario.setSenha(novaSenhaCodificada);
        usuarioRepository.save(usuario);
    }


}