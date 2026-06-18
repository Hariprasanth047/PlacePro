package placepro_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import placepro_backend.model.SQLQuestion;
import placepro_backend.repository.SQLQuestionRepository;

@Service
public class SQLQuestionService {

    @Autowired
    private SQLQuestionRepository repository;

    public SQLQuestion addQuestion(SQLQuestion question) {
        return repository.save(question);
    }

    public List<SQLQuestion> getAllQuestions() {
        return repository.findAll();
    }
}