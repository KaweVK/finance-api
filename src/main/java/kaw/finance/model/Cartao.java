package kaw.finance.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "cartao")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Cartao {

    @Id
    @Column(name = "id",  nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "nome",  nullable = false)
    private String nome;
    @Column(name = "data_vencimento", nullable = false)
    private LocalDateTime dataVencimento;
    @Column(name = "data_fechamento", nullable = false)
    private LocalDateTime dataFechamento;
    @CreatedDate
    @Column(name = "data_registro")
    private LocalDateTime dataRegistro;
    @LastModifiedDate
    @Column(name = "data_update")
    private LocalDateTime dataUpdate;
}
