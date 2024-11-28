package com.example.crudjava.infra.rawToken;

import com.example.crudjava.domain.usuario.Usuario;
import com.example.crudjava.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.token.KeyBasedPersistenceTokenService;
import org.springframework.security.core.token.SecureRandomFactoryBean;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TokenTransparenteService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    private Set<String> usedTokens = new HashSet<>();

    @SneakyThrows
    public String gerarToken(Usuario usuario) {
        var tokenService = getInstanceFor(usuario);
        var token = tokenService.allocateToken(String.valueOf(usuario.getId()));
        return token.getKey();
    }

    @SneakyThrows
    public void validaToken(String rawToken) {
        if (usedTokens.contains(rawToken)) throw new RuntimeException("Token já usado");
        var publicData = readPublicData(rawToken);
        if (tempoExpirado(publicData)) throw new RuntimeException("Token Expirado");
        var usuario = usuarioRepository.getReferenceById(publicData.idusuario());
        var tokenService = getInstanceFor(usuario);
        tokenService.verifyToken(rawToken);
        usedTokens.add(rawToken);
    }

    @SneakyThrows
    public Usuario retornaUsuario(String rawToken) {
        var publicData = readPublicData(rawToken);
        if (tempoExpirado(publicData)) throw new RuntimeException("Token Expirado");
        return usuarioRepository.getReferenceById(publicData.idusuario());
    }


    public KeyBasedPersistenceTokenService getInstanceFor(Usuario usuario) throws Exception {
        var tokenService = new KeyBasedPersistenceTokenService();
        tokenService.setServerSecret(usuario.getPassword());
        tokenService.setServerInteger(22);
        tokenService.setSecureRandom(new SecureRandomFactoryBean().getObject());
        return tokenService;
    }

    public boolean tempoExpirado(DadosTokenPublico dados) {
        Instant createAt = new Date(dados.timestamp()).toInstant();
        Instant now = new Date().toInstant();
        return createAt.plus(Duration.ofMinutes(5)).isBefore(now);
    }

    public DadosTokenPublico readPublicData(String rawToken) {
        var bytes = Base64.getDecoder().decode(rawToken);
        var rawTokenDecoded = new String(bytes);
        String[] tokenParts = rawTokenDecoded.split(":");
        var timestamp = Long.parseLong(tokenParts[0]);
        var idUsuario = tokenParts[2];
        return new DadosTokenPublico(Long.valueOf(idUsuario), timestamp);
    }
}
