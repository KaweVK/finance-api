package kaw.finance.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record ResponseCartaoDto  (
        Long id,
        @NotNull
        @NotEmpty
        @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
        String nome,
        @NotNull
        LocalDateTime dataVencimento,
        @NotNull
        LocalDateTime dataFechamento
) {}
