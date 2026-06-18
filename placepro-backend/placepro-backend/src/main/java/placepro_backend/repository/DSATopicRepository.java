package placepro_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import placepro_backend.model.DSATopic;

public interface DSATopicRepository
        extends JpaRepository<DSATopic, Long> {
}