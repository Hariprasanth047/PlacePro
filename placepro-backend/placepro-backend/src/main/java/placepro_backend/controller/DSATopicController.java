package placepro_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.model.DSATopic;
import placepro_backend.service.DSATopicService;

@RestController
@RequestMapping("/api/dsa")
@CrossOrigin("*")
public class DSATopicController {

    @Autowired
    private DSATopicService service;

    @PostMapping
    public DSATopic addTopic(
            @RequestBody DSATopic topic) {

        return service.addTopic(topic);
    }

    @GetMapping
    public List<DSATopic> getAllTopics() {

        return service.getAllTopics();
    }
}