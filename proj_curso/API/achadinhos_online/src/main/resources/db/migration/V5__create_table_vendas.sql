CREATE TABLE vendas (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    funcionario_id BIGINT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    comissao DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_vendas_funcionario_id FOREIGN KEY(funcionario_id) REFERENCES funcionarios(id)
);