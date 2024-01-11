CREATE TABLE carrinho(
    id INT AUTO_INCREMENT PRIMARY KEY,
    funcionario_id INT NOT NULL,
    produto_id INT NOT NULL,

    CONSTRAINT fk_carrinho_funcionario_id FOREIGN KEY(funcionario_id) REFERENCES funcionarios(id),
    CONSTRAINT fk_carrinho_produto_id FOREIGN KEY(produto_id) REFERENCES produtos(id)
);

