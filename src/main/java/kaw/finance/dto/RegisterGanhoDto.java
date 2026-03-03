package kaw.finance.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

public record RegisterGanhoDto(
        Long id,
        @NotNull
        @NotEmpty
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String nome,
        @Size(max = 300, message = "Descrição deve ter no máximo 300 caracteres")
        String descricao,
        @NotNull
        BigDecimal valor,
        Date data,
        LocalDateTime dataRegistro,
        LocalDateTime dataUpdate
) {
}
