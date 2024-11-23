package com.example.crudjava.infra;

import java.text.Normalizer;

public abstract class FuncionalidadesService {
    public static String removerCaracteresEspeciais(String texto) {
        // Remove acentos e outros caracteres especiais
        texto = Normalizer.normalize(texto, Normalizer.Form.NFD);
        texto = texto.replaceAll("[^\\p{ASCII}]", "");
        return texto;
    }
}
