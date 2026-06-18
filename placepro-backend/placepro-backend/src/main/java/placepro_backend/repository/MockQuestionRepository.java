package placepro_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import placepro_backend.model.MockQuestion;

public interface MockQuestionRepository
        extends JpaRepository<MockQuestion, Long> {
}