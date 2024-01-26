CREATE TABLE carrinho (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    funcionario_id BIGINT NOT NULL,
    produto_id BIGINT NOT NULL,


    CONSTRAINT fk_carrinho_funcionario_id FOREIGN KEY(funcionario_id) REFERENCES funcionarios(id),
    CONSTRAINT fk_carrinho_produto_id FOREIGN KEY(produto_id) REFERENCES produtos(id)
);