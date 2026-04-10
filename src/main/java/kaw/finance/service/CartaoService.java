package kaw.finance.service;

import kaw.finance.dto.RegisterCartaoDto;
import kaw.finance.dto.ResponseCartaoDto;
import kaw.finance.dto.mapper.CartaoMapper;
import kaw.finance.exceptions.CartaoNotFoundException;
import kaw.finance.model.Cartao;
import kaw.finance.repository.CartaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartaoService {

    @Autowired
    private CartaoRepository cartaoRepository;
    @Autowired
    private CartaoMapper cartaoMapper;

    public Optional<Cartao> findCartaoById(Long id){
        Optional<Cartao> cartao = cartaoRepository.findById(id);
        if (cartao.isEmpty()) {
            throw new CartaoNotFoundException("Cartao não encontrado");
        }
        return cartao;
    }

    public Page<ResponseCartaoDto> findAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Cartao> cartoes = cartaoRepository.findAll(pageable);
        return cartoes.map(cartaoMapper::toResponseDTO);
    }

    public Cartao createCartao (RegisterCartaoDto cartaoDto){
        var cartao = cartaoMapper.toEntity(cartaoDto);
        return cartaoRepository.save(cartao);
    }

    public Cartao updateCartao(Long id, RegisterCartaoDto cartaoDto){
        var cartao = cartaoRepository.findById(id).orElseThrow(() -> new CartaoNotFoundException("Cartao não encontrado"));

        cartao.setNome(cartaoDto.nome());
        cartao.setDataFechamento(cartaoDto.dataFechamento());
        cartao.setDataVencimento(cartaoDto.dataVencimento());
        cartao.setDataUpdate(cartaoDto.dataUpdate());

        return cartaoRepository.save(cartao);
    }

    public void deleteCartao(Long id){
        cartaoRepository.deleteById(id);
    }
}
