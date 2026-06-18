package placepro_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import placepro_backend.model.SQLQuestion;
import placepro_backend.service.SQLQuestionService;

@RestController
@RequestMapping("/api/sql")
@CrossOrigin("*")
public class SQLQuestionController {

    @Autowired
    private SQLQuestionService service;

    @PostMapping
    public SQLQuestion addQuestion(
            @RequestBody SQLQuestion question) {

        return service.addQuestion(question);
    }

    @GetMapping
    public List<SQLQuestion> getAllQuestions() {

        return service.getAllQuestions();
    }
}