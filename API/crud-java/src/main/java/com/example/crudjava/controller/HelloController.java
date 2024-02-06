package com.example.crudjava.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("hello")
@CrossOrigin(origins = "http://localhost:8081")
public class HelloController {
    @GetMapping
    public String pagHello() {
        return "Hello World";
    }
}
