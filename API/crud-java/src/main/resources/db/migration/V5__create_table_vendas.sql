CREATE TABLE vendas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    funcionario_id INT NOT NULL,
    produto_id INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    comissao DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_vendas_funcionario_id FOREIGN KEY(funcionario_id) REFERENCES funcionarios(id),
    CONSTRAINT fk_vendas_produto_id FOREIGN KEY(produto_id) REFERENCES produtos(id)
);

