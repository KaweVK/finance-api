package kaw.finance.model;

import jakarta.persistence.*;
import kaw.finance.model.enums.TipoGasto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "gasto")
public class Gasto {

    @Id
    @Column(name = "id",  nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nome",  nullable = false)
    private String nome;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "valor",  nullable = false)
    private BigDecimal valor;
    @Column(name = "tipo_gasto")
    private TipoGasto tipoGasto;
    @Column(name = "data")
    private Date data;
    @CreatedDate
    @Column(name = "data_registro")
    private LocalDateTime dataRegistro;
    @LastModifiedDate
    @Column(name = "data_update")
    private LocalDateTime dataUpdate;
}
