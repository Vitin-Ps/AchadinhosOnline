package com.example.crudjava.domain.usuario;

import io.micrometer.common.util.StringUtils;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;

@Table(name = "usuario")
@Entity(name = "Usuario")
@Component
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String login;
    @Setter
    private String senha;
    private String nome;
    @Enumerated(EnumType.STRING)
    private TipoUsuario tipo;

    public Usuario(String login, String senhaCodificada, String nome, TipoUsuario tipoUsuario) {
        this.login = login;
        this.senha = senhaCodificada;
        this.tipo = tipoUsuario;
        this.nome = nome;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (this.tipo == TipoUsuario.ADMIN)
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        if (this.tipo == TipoUsuario.FUNCIONARIO)
            return List.of(new SimpleGrantedAuthority("ROLE_FUNCIONARIO"), new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void atualizarInfo(String email, String nome, String senhaCodificada) {
        if (!StringUtils.isBlank(email)) {
            this.login = email;
        }
        if (!StringUtils.isBlank(senhaCodificada)) {
            this.senha = senhaCodificada;
        }
        if (!StringUtils.isBlank(nome)) {
            this.nome = nome;
        }
    }
}
