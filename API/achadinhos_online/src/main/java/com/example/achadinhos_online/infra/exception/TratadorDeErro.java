package com.example.achadinhos_online.infra.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class TratadorDeErro {
    @ExceptionHandler
    public ResponseEntity erro500(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + ex.getLocalizedMessage());
    }

    @ExceptionHandler(ValidacaoException.class)
    public ResponseEntity tratarRegraDeNegocio(ValidacaoException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity erroValidacaoCampos(MethodArgumentNotValidException ex) {
        var erros = ex.getFieldErrors();
        return ResponseEntity.badRequest().body(erros.stream().map(DadosErroValidacao::new).toList());
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity erroSemJson(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest().body("Corpo da requisição veio Vazio!");
    }

    private record DadosErroValidacao(String campo, String message) {
        public DadosErroValidacao(FieldError ex) {
            this(ex.getField(), ex.getDefaultMessage());
        }
    }
}
