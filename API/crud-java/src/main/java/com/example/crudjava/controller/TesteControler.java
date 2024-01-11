package com.example.crudjava.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teste")
@CrossOrigin(origins = {"http://localhost:4200", "http://192.168.100.46:4200"})
public class TesteControler {
    @GetMapping
    public String pagHello() {
        return "Hello World";
    }
}
