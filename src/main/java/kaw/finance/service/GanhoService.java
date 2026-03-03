package kaw.finance.service;

import kaw.finance.dto.RegisterGanhoDto;
import kaw.finance.dto.ResponseGanhoDto;
import kaw.finance.dto.mapper.GanhoMapper;
import kaw.finance.exceptions.GanhoNotFoundException;
import kaw.finance.model.Ganho;
import kaw.finance.repository.GanhoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.Optional;

@Service
public class GanhoService {

    @Autowired
    private GanhoRepository ganhoRepository;
    @Autowired
    private GanhoMapper ganhoMapper;

    public Optional<Ganho> findGanhoById(Long id){
        Optional<Ganho> ganho = ganhoRepository.findById(id);
        if (ganho.isEmpty()) {
            throw new GanhoNotFoundException("Ganho não encontrado");
        }
        return ganho;
    }

    public Page<ResponseGanhoDto> findAllGanho(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Ganho> ganhos = ganhoRepository.findAll(pageable);
        return ganhos.map(ganhoMapper::toResponseDTO);
    }

    public Ganho createGanho(RegisterGanhoDto ganhoDto){
        var ganho = ganhoMapper.toEntity(ganhoDto);
        return ganhoRepository.save(ganho);
    }

    public Ganho updateGanho(Long id, RegisterGanhoDto ganhoDto){
        var ganho = ganhoRepository.findById(id).orElseThrow(() -> new GanhoNotFoundException("Ganho não encontrado"));

        ganho.setNome(ganhoDto.nome());
        ganho.setDescricao(ganhoDto.descricao());
        ganho.setValor(ganhoDto.valor());
        ganho.setData(ganhoDto.data());
        ganho.setDataUpdate(ganhoDto.dataUpdate());

        return ganhoRepository.save(ganho);
    }

    public void deleteGanho(Long id){
        ganhoRepository.deleteById(id);
    }


}
