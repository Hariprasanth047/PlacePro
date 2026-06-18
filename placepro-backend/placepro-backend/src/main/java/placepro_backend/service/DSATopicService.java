package placepro_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import placepro_backend.model.DSATopic;
import placepro_backend.repository.DSATopicRepository;

@Service
public class DSATopicService {

    @Autowired
    private DSATopicRepository repository;

    public DSATopic addTopic(DSATopic topic) {
        return repository.save(topic);
    }

    public List<DSATopic> getAllTopics() {
        return repository.findAll();
    }
}