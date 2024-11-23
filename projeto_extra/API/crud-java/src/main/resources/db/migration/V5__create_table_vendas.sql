  CREATE TABLE vendas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      funcionario_id INT NOT NULL,
      nome_cliente VARCHAR(255) NOT NULL,
      valor_total DECIMAL(10,2),

      CONSTRAINT fk_venda_funcionario_id FOREIGN KEY(funcionario_id) REFERENCES funcionarios(id)
  );

