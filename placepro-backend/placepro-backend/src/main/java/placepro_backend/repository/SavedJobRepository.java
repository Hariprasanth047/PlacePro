package placepro_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import placepro_backend.model.SavedJob;

public interface SavedJobRepository
        extends JpaRepository<SavedJob, Long> {

}