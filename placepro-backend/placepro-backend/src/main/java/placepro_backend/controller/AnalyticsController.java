package placepro_backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.repository.UserRepository;
import placepro_backend.repository.JobRepository;
import placepro_backend.repository.ApplicationRepository;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @GetMapping
    public Map<String, Long> getAnalytics() {

        Map<String, Long> analytics = new HashMap<>();

        analytics.put(
                "totalUsers",
                userRepository.count());

        analytics.put(
                "totalJobs",
                jobRepository.count());

        analytics.put(
                "totalApplications",
                applicationRepository.count());

        analytics.put(
                "approvedApplications",
                applicationRepository.countByStatus("Approved"));

        analytics.put(
                "rejectedApplications",
                applicationRepository.countByStatus("Rejected"));

        return analytics;
    }
}