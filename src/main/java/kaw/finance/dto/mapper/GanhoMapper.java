package kaw.finance.dto.mapper;

import kaw.finance.dto.RegisterGanhoDto;
import kaw.finance.dto.ResponseGanhoDto;
import kaw.finance.model.Ganho;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GanhoMapper {

    Ganho toEntity(RegisterGanhoDto ganhoDto);

    ResponseGanhoDto toResponseDTO(Ganho ganho);


}
