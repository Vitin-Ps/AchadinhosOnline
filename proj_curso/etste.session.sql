 SELECT
           (SELECT COUNT(*) FROM funcionarios),
           (SELECT COUNT(*) FROM produtos),
           (SELECT COUNT(*) FROM vendas)