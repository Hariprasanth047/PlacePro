package placepro_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import placepro_backend.model.MockQuestion;
import placepro_backend.repository.MockQuestionRepository;

@Service
public class MockQuestionService {

    @Autowired
    private MockQuestionRepository repository;

    public MockQuestion addQuestion(
            MockQuestion question) {

        return repository.save(question);
    }

    public List<MockQuestion> getAllQuestions() {

        return repository.findAll();
    }
}