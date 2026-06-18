package placepro_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.model.MockQuestion;
import placepro_backend.service.MockQuestionService;

@RestController
@RequestMapping("/api/mock")
@CrossOrigin("*")
public class MockQuestionController {

    @Autowired
    private MockQuestionService service;

    @PostMapping
    public MockQuestion addQuestion(
            @RequestBody MockQuestion question) {

        return service.addQuestion(question);
    }

    @GetMapping
    public List<MockQuestion> getAllQuestions() {

        return service.getAllQuestions();
    }
}