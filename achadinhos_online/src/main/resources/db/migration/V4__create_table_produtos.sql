CREATE TABLE produtos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(200) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    ativo TINYINT
);