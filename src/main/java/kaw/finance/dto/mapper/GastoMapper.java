package kaw.finance.dto.mapper;

import kaw.finance.dto.RegisterGastoDto;
import kaw.finance.dto.ResponseGastoDto;
import kaw.finance.model.Gasto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GastoMapper {

    Gasto toEntity(RegisterGastoDto gastoDto);

    ResponseGastoDto toResponseDTO(Gasto gasto);

}
