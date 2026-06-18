package placepro_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import placepro_backend.model.Application;
import placepro_backend.repository.ApplicationRepository;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application applyJob(Application application) {
        return applicationRepository.save(application);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
    // Update Application Status
public Application updateStatus(Long id, String status) {

    Application application =
            applicationRepository.findById(id).orElse(null);

    if(application != null) {

        application.setStatus(status);

        return applicationRepository.save(application);
    }

    return null;
}
}