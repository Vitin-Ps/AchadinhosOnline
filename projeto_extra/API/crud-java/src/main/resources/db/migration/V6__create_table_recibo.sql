 CREATE TABLE recibo(
     id INT AUTO_INCREMENT PRIMARY KEY,
     venda_id INT NOT NULL,
     produto_id INT NOT NULL,
     quantidade INT NOT NULL,

     CONSTRAINT fk_recibo_produto_id FOREIGN KEY(produto_id) REFERENCES produtos(id),
     CONSTRAINT fk_recibo_venda_id FOREIGN KEY(venda_id) REFERENCES vendas(id)
 );

