package placepro_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import placepro_backend.model.SavedJob;
import placepro_backend.repository.SavedJobRepository;

@Service
public class SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    public SavedJob saveJob(SavedJob savedJob) {
        return savedJobRepository.save(savedJob);
    }

    public List<SavedJob> getAllSavedJobs() {
        return savedJobRepository.findAll();
    }

    public void deleteSavedJob(Long id) {
        savedJobRepository.deleteById(id);
    }
}