package com.example.crudjava.infra;

import com.example.crudjava.infra.exception.ValidacaoException;
import org.springframework.util.StringUtils;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.Normalizer;

public abstract class FuncionalidadesService {
    public static String formatarNomeArquivo(String nomeArquivo) {
        // Transforma tudo em letra minúscula
        nomeArquivo = nomeArquivo.toLowerCase();
        // Remove caracteres especiais
        nomeArquivo = removerCaracteresEspeciais(nomeArquivo);
        // Substitui espaços por _
        nomeArquivo = nomeArquivo.replace(" ", "_");
        return nomeArquivo;
    }

    public static String removerCaracteresEspeciais(String texto) {
        // Remove acentos e outros caracteres especiais
        texto = Normalizer.normalize(texto, Normalizer.Form.NFD);
        texto = texto.replaceAll("[^\\p{ASCII}]", "");
        return texto;
    }

    public static String extrairNomeArquivo(String linkArquivo) {
        if(linkArquivo == null) return null;
        try {
            URL url = new URL(linkArquivo);
            String path = url.getPath();
            String[] linkPartido = path.split("/");
            String nomeArquivo = linkPartido[linkPartido.length - 1];
            return nomeArquivo;
        } catch (MalformedURLException e) {
            throw new ValidacaoException("URL de arquivo Inválida!");
        }
    }

    public static String gerarNomeArquivoTimestamp(String nomeOriginal) {
        String nomeArquivo = StringUtils.cleanPath(nomeOriginal);
        String nomeBase = nomeArquivo.substring(0, nomeArquivo.lastIndexOf('.'));
        String extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf('.'));
        return nomeBase + "_" + System.currentTimeMillis() + extensao;
    }

}
