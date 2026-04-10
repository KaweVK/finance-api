package kaw.finance.repository;

import kaw.finance.model.Gasto;
import kaw.finance.model.enums.Situacao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface GastoRepository extends JpaRepository<Gasto, Long>, JpaSpecificationExecutor<Gasto> {

    Page<Gasto> findBySituacao(Situacao situacao, Pageable pageable);
}
