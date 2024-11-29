package com.example.crudjava.infra;

import java.text.Normalizer;

public abstract class FuncionalidadesService {
    public static String removerCaracteresEspeciais(String texto) {
        texto = Normalizer.normalize(texto, Normalizer.Form.NFD);
        texto = texto.replaceAll("[^\\p{ASCII}]", "");
        return texto;
    }

    public static String retornaMsgEmail(String nome, String token) {

        String mensagem = """
                <style>
                      * {
                        padding: 0;
                        margin: 0;
                        font-family: Arial, Helvetica, sans-serif;
                      }
                      .main {
                        margin: 5em;
                        padding: 2em;
                        border: 2px solid #b300c7;
                        border-radius: 15px;
                        box-shadow: 10px 10px 20px #00000035;
                        max-width: 460px;
                                
                        display: flex;
                        flex-direction: column;
                        gap: 20px;
                      }
                                
                      .main h2 {
                        color: #8200b1;
                      }
                                
                      .main a {
                        text-decoration: none;
                        font-weight: bold;
                        color: #b300c7;
                        transition: 0.2s;
                      }
                                
                      .main a:hover {
                        color: #44004b;
                      }
                    </style>
                    <div class="main">
                      <h2>Olá @@nomeUsuario@@, tudo bom?</h2>
                      <p>Aqui está o link para que você possa trocar a sua senha:</p>
                      <p>
                        <a href="http://localhost:4200/recuperar-senha/@@tokenTransparente@@" target="_blank"
                          >Clique aqui</a
                        >
                        <span>para alterar a sua senha atual.</span>
                      </p>
                      <p>Lembrando que esse link tem a validade de 2 horas. Não perca tempo!!!</p>                      
                    </div>
                """;

        mensagem = mensagem.replace("@@nomeUsuario@@", nome);
        mensagem = mensagem.replace("@@tokenTransparente@@", token);

        return mensagem;
    }
}
