package kaw.finance.repository;

import kaw.finance.model.Ganho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface GanhoRepository extends JpaRepository<Ganho, Long>, JpaSpecificationExecutor<Ganho> {
}
