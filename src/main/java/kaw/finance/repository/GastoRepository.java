package kaw.finance.repository;

import kaw.finance.model.Gasto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface GastoRepository extends JpaRepository<Gasto, Long>, JpaSpecificationExecutor<Gasto> {

    @Query("SELECT g FROM Gasto g WHERE g.situacao = 1")
    Page<Gasto> findAllNaoPago(Pageable pageable);
}
