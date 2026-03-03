package kaw.finance.service;

import kaw.finance.dto.RegisterGastoDto;
import kaw.finance.dto.ResponseGastoDto;
import kaw.finance.dto.mapper.GastoMapper;
import kaw.finance.model.Gasto;
import kaw.finance.repository.GastoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;

import java.util.Optional;

@Service
public class GastoService {

    @Autowired
    private GastoRepository gastoRepository;
    @Autowired
    private GastoMapper gastoMapper;

    public Gasto createGasto(RegisterGastoDto gastoDto){
        var gasto = gastoMapper.toEntity(gastoDto);
        return gastoRepository.save(gasto);
    }

    public void deleteGasto(Long id){
        gastoRepository.deleteById(id);
    }

    public Gasto updateGasto(Long id, RegisterGastoDto gastoDto){
        var gasto = gastoRepository.findById(id).orElseThrow(() -> new RuntimeException("Gasto não encontrado"));

        gasto.setNome(gastoDto.nome());
        gasto.setDescricao(gastoDto.descricao());
        gasto.setValor(gastoDto.valor());
        gasto.setTipoGasto(gastoDto.tipoGasto());
        gasto.setData(gastoDto.data());

        return gastoRepository.save(gasto);
    }

    public Page<ResponseGastoDto> findAll(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Gasto> gastos = gastoRepository.findAll(pageable);
        return gastos.map(gastoMapper::toResponseDTO);
    }

    public Optional<Gasto> findById(Long id) {
        Optional<Gasto> gasto = gastoRepository.findById(id);
        if (gasto.isEmpty()) {
            throw new RuntimeException("Gasto não encontrado");
        }
        return gasto;
    }
}
