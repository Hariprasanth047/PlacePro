package placepro_backend.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin("*")
public class ResumeController {

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public String uploadResume(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        File directory = new File(UPLOAD_DIR);

        if (!directory.exists()) {
            directory.mkdirs();
        }

        String fileName = file.getOriginalFilename();

        file.transferTo(
                new File(UPLOAD_DIR + fileName));

        return "Resume Uploaded Successfully: "
                + fileName;
    }
}