package com.example.crudjava.domain.recibo;

import com.example.crudjava.domain.carrinho.Carrinho;
import com.example.crudjava.domain.carrinho.CarrinhoService;
import com.example.crudjava.domain.estoque.Estoque;
import com.example.crudjava.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReciboService {
    @Autowired
    private VendaRepository vendaRepository;
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ReciboRepository reciboRepository;


    @Autowired
    private CarrinhoService carrinhoService;

    @Autowired
    private EstoqueRepository estoqueRepository;


    public List<DadosListagemRecibo> listarReciboVenda(Long id) {
        return reciboRepository.findAllByVendaId(id).stream().map(DadosListagemRecibo::new).toList();
    }

    public List<DadosRegistroRecibo> listarCarrinhoRecibo(List<Carrinho> listCarrinho) {
        List<DadosRegistroRecibo> listCarrinhoRecibo = new ArrayList<>();

        if (!listCarrinho.isEmpty()) {
            for (Carrinho itemCarrinho : listCarrinho) {

                DadosRegistroRecibo itemExistente = listCarrinhoRecibo.stream().filter(dados -> dados.produto().getId().equals(itemCarrinho.getProduto().getId())).findFirst().orElse(null);

                if (itemExistente == null) {
                    listCarrinhoRecibo.add(new DadosRegistroRecibo(itemCarrinho, itemCarrinho.getQuantidade()));
                } else {
                    listCarrinhoRecibo.remove(itemExistente);
                    listCarrinhoRecibo.add(new DadosRegistroRecibo(itemCarrinho, itemExistente.quantidade() + itemCarrinho.getQuantidade()));
                }
            }
        }


        return listCarrinhoRecibo;
    }

    public List<DadosListagemRecibo> deleteItemRecibo(Long id) {
        Recibo itemRecibo = reciboRepository.getReferenceById(id);
        BigDecimal valorDoItem = itemRecibo.getProduto().getValor().multiply(BigDecimal.valueOf(itemRecibo.getQuantidade()));
        BigDecimal porcentagemDaComissao = itemRecibo.getVenda().getComissaoTotal().divide(itemRecibo.getVenda().getValorTotal(), 2, RoundingMode.HALF_UP);
        BigDecimal valorDaComissao = valorDoItem.multiply(porcentagemDaComissao);

        Estoque estoque = estoqueRepository.getReferenceByProdutoId(itemRecibo.getProduto().getId());

        if (estoque != null) estoque.atualizarQuantidade(itemRecibo.getQuantidade(), true);

        itemRecibo.getVenda().setComissaoTotal(itemRecibo.getVenda().getComissaoTotal().subtract(valorDaComissao));
        itemRecibo.getVenda().setValorTotal(itemRecibo.getVenda().getValorTotal().subtract(valorDoItem));

        reciboRepository.delete(itemRecibo);
        return reciboRepository.findAllByVendaId(itemRecibo.getVenda().getId()).stream().map(DadosListagemRecibo::new).toList();
    }
}
