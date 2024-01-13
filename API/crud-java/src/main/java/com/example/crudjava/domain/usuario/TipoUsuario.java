package com.example.crudjava.domain.usuario;

public enum TipoUsuario {
    ADMIN("admin"),
    FUNCIONARIO("funcionario");

    private String tipoUsuario;

    TipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }
}
