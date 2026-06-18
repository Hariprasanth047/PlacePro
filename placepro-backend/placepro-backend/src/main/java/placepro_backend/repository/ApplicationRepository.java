package placepro_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import placepro_backend.model.Application;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    long countByStatus(String status);
}