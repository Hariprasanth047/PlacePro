package placepro_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import placepro_backend.model.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByCompanyName(String companyName);

    List<Job> findByLocation(String location);
}