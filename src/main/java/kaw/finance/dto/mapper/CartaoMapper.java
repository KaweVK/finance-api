package kaw.finance.dto.mapper;

import kaw.finance.dto.RegisterCartaoDto;
import kaw.finance.dto.ResponseCartaoDto;
import kaw.finance.model.Cartao;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CartaoMapper {

    Cartao toEntity(RegisterCartaoDto cartaoDto);

    ResponseCartaoDto toResponseDTO(Cartao cartao);

}
