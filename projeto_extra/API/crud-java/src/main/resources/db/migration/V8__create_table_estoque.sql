 CREATE TABLE estoque(
     id INT AUTO_INCREMENT PRIMARY KEY,
     produto_id INT NOT NULL,
     quantidade INT NOT NULL,

     CONSTRAINT fk_estoque_produto_id FOREIGN KEY(produto_id) REFERENCES produtos(id)
 );

