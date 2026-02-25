package kaw.finance.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import kaw.finance.model.enums.TipoGasto;

import java.math.BigDecimal;
import java.util.Date;

public record RegisterGastoDto(
        Long id,
        @NotNull
        @NotEmpty
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String nome,
        @Size(max = 300, message = "Descrição deve ter no máximo 300 caracteres")
        String descricao,
        @NotNull
        BigDecimal valor,
        @NotNull
        TipoGasto tipoGasto,
        Date data
) {
}
