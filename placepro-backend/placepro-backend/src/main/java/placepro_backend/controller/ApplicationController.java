package placepro_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.model.Application;
import placepro_backend.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin("*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public Application applyJob(
            @RequestBody Application application) {

        application.setStatus("Applied");

        return applicationService.applyJob(application);
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }
    @PutMapping("/{id}/status")
public Application updateStatus(
        @PathVariable Long id,
        @RequestParam String status) {

    return applicationService.updateStatus(id, status);
}
@GetMapping("/count")
public Long getApplicationCount() {

    return applicationService
            .getAllApplications()
            .stream()
            .count();
}
}
