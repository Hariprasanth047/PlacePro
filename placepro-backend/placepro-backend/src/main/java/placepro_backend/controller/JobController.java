package placepro_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.model.Job;
import placepro_backend.service.JobService;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin("*")
public class JobController {

    @Autowired
    private JobService jobService;

    // Add Job
    @PostMapping
    public Job addJob(@RequestBody Job job) {
        return jobService.addJob(job);
    }

    // Get All Jobs
    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    // Get Job By ID
    @GetMapping("/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // Update Job
    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id,
                         @RequestBody Job job) {
        return jobService.updateJob(id, job);
    }

    // Delete Job
    @DeleteMapping("/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
        return "Job deleted successfully";
    }
    // Search By Company
@GetMapping("/company/{companyName}")
public List<Job> getJobsByCompany(
        @PathVariable String companyName) {

    return jobService.getJobsByCompany(companyName);
}

// Search By Location
@GetMapping("/location/{location}")
public List<Job> getJobsByLocation(
        @PathVariable String location) {

    return jobService.getJobsByLocation(location);
}
}