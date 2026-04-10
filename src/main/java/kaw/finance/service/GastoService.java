package kaw.finance.service;

import kaw.finance.dto.RegisterGastoDto;
import kaw.finance.dto.ResponseGastoDto;
import kaw.finance.dto.mapper.GastoMapper;
import kaw.finance.exceptions.GastoNotFoundException;
import kaw.finance.model.Gasto;
import kaw.finance.model.enums.Situacao;
import kaw.finance.repository.GastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;

@Service
public class GastoService {

    @Autowired
    private GastoRepository gastoRepository;
    @Autowired
    private GastoMapper gastoMapper;

    public Optional<Gasto> findById(Long id) {
        Optional<Gasto> gasto = gastoRepository.findById(id);
        if (gasto.isEmpty()) {
            throw new GastoNotFoundException("Gasto não encontrado");
        }
        return gasto;
    }

    public Page<ResponseGastoDto> findAll(Integer page, Integer size, Situacao situacao) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Gasto> gastos = situacao == null
                ? gastoRepository.findAll(pageable)
                : gastoRepository.findBySituacao(situacao, pageable);
        return gastos.map(gastoMapper::toResponseDTO);
    }

    public Gasto createGasto(RegisterGastoDto gastoDto){
        Gasto gasto1 = null;
        for (int i = 0; i < gastoDto.qtdParcelas(); i++) {
            var gasto = gastoMapper.toEntity(gastoDto);
            gasto.setValor(gasto.getValor().divide(BigDecimal.valueOf(gastoDto.qtdParcelas()), RoundingMode.HALF_UP));
            gasto.setData(gastoDto.data().plusMonths(i));
            gastoRepository.save(gasto);
            if (i == 0) {
                gasto1 = gasto;
            }
        }
        return gasto1;
    }

    public Gasto updateGasto(Long id, RegisterGastoDto gastoDto){
        var gasto = gastoRepository.findById(id)
                .orElseThrow(() -> new GastoNotFoundException("Gasto não encontrado"));

        gasto.setNome(gastoDto.nome());
        gasto.setDescricao(gastoDto.descricao());
        gasto.setValor(gastoDto.valor().divide(BigDecimal.valueOf(gastoDto.qtdParcelas()), RoundingMode.HALF_UP));
        gasto.setTipoGasto(gastoDto.tipoGasto());
        gasto.setData(gastoDto.data());
        gasto.setMetodoPagamento(gastoDto.metodoPagamento());
        gasto.setSituacao(gastoDto.situacao());
        gasto.setCartao(gastoDto.cartao());

        gasto.setQtdParcelas(gastoDto.qtdParcelas());

        return gastoRepository.save(gasto);
    }

    public void deleteGasto(Long id){
        gastoRepository.deleteById(id);
    }
}
