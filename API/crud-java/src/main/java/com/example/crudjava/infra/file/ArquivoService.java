package com.example.crudjava.infra.file;

import com.example.crudjava.infra.exception.ValidacaoException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;

@Service
public class ArquivoService {
    private final Path arquivoLocalizacao;

    public ArquivoService(ArquivoPropriedade arquivoPropriedade) {
        this.arquivoLocalizacao = Paths.get(arquivoPropriedade.getUploadDir())
                .toAbsolutePath().normalize();
    }

    public String enviarArquivo(MultipartFile arquivo, Boolean gerarNome) {
        String nomeArquivo = StringUtils.cleanPath(Objects.requireNonNull(arquivo.getOriginalFilename()));
        if(gerarNome) {
            nomeArquivo = gerarNomeArquivoTimestamp(arquivo.getOriginalFilename());
        }
        try{
            Path targetLocalizacao = arquivoLocalizacao.resolve(nomeArquivo);
            arquivo.transferTo(targetLocalizacao);

            String uriArquivoDownload = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path(  "/arquivos/")
                    .path(nomeArquivo)
                    .toUriString();
            return uriArquivoDownload;
        } catch (IOException ex) {
            throw new ValidacaoException("Falha no Upload do arquivo!");
        }
    }

    public ResponseEntity<Resource> downloadArquivo(String fileName, HttpServletRequest request) throws IOException {
        Path nomeArquivo = arquivoLocalizacao.resolve(fileName).normalize();
        try {
            Resource resource = new UrlResource(nomeArquivo.toUri());
            String contentType = request.getServletContext().getMimeType((resource.getFile().getAbsolutePath()));
            if(contentType == null) contentType = "application/octet-stream";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            throw new ValidacaoException("Erro ao buscar link para download!");
        }
    }

    public List<DadosNomeArquivo> listarArquivos() throws IOException {
        List<String> nomeArquivos = Files.list(arquivoLocalizacao)
                .map(Path::getFileName)
                .map(Path::toString)
                .toList();
        return nomeArquivos.stream().map(DadosNomeArquivo::new).toList();
    }

    private String gerarNomeArquivoTimestamp(String nomeOriginal) {
        String nomeArquivo = StringUtils.cleanPath(nomeOriginal);
        String nomeBase = nomeArquivo.substring(0, nomeArquivo.lastIndexOf('.'));
        String extensao = nomeArquivo.substring(nomeArquivo.lastIndexOf('.'));
        return nomeBase + "_" + System.currentTimeMillis() + extensao;
    }
}
