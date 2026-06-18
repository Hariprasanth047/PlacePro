package placepro_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import placepro_backend.model.Job;
import placepro_backend.repository.JobRepository;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public Job addJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
    // Get Job By ID
public Job getJobById(Long id) {
    return jobRepository.findById(id).orElse(null);
}

// Update Job
public Job updateJob(Long id, Job job) {

    Job existingJob = jobRepository.findById(id).orElse(null);

    if(existingJob != null) {

        existingJob.setCompanyName(job.getCompanyName());
        existingJob.setRole(job.getRole());
        existingJob.setSalary(job.getSalary());
        existingJob.setLocation(job.getLocation());

        return jobRepository.save(existingJob);
    }

    return null;
}

// Delete Job

public void deleteJob(Long id) {
    jobRepository.deleteById(id);
}
// Search By Company
public List<Job> getJobsByCompany(String companyName) {
    return jobRepository.findByCompanyName(companyName);
}

// Search By Location
public List<Job> getJobsByLocation(String location) {
    return jobRepository.findByLocation(location);
}
}