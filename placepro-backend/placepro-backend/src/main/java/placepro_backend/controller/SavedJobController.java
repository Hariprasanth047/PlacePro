package placepro_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.model.SavedJob;
import placepro_backend.service.SavedJobService;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin("*")
public class SavedJobController {

    @Autowired
    private SavedJobService savedJobService;

    @PostMapping
    public SavedJob saveJob(
            @RequestBody SavedJob savedJob) {

        return savedJobService.saveJob(savedJob);
    }

    @GetMapping
    public List<SavedJob> getAllSavedJobs() {

        return savedJobService.getAllSavedJobs();
    }

    @DeleteMapping("/{id}")
    public String deleteSavedJob(
            @PathVariable Long id) {

        savedJobService.deleteSavedJob(id);

        return "Saved Job Deleted Successfully";
    }
}