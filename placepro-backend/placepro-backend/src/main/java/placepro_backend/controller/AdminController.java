package placepro_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.model.User;
import placepro_backend.model.Job;
import placepro_backend.model.Application;
import placepro_backend.repository.UserRepository;
import placepro_backend.repository.JobRepository;
import placepro_backend.repository.ApplicationRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    // All Users
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // All Jobs
    @GetMapping("/jobs")
    public List<Job> getJobs() {
        return jobRepository.findAll();
    }

    // All Applications
    @GetMapping("/applications")
    public List<Application> getApplications() {
        return applicationRepository.findAll();
    }

    // Delete User
    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "User Deleted Successfully";
    }

    // Delete Job
    @DeleteMapping("/jobs/{id}")
    public String deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return "Job Deleted Successfully";
    }
}