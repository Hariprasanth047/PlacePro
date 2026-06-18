package placepro_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import placepro_backend.model.SQLQuestion;

public interface SQLQuestionRepository
        extends JpaRepository<SQLQuestion, Long> {
}