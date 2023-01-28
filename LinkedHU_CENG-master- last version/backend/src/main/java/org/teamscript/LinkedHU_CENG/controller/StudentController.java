package org.teamscript.LinkedHU_CENG.controller;


import org.springframework.web.bind.annotation.*;
import org.teamscript.LinkedHU_CENG.model.Student;
import org.teamscript.LinkedHU_CENG.service.StudentService;

import java.util.Map;
@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @PostMapping("/add")
    public Student addStudent(@RequestBody Map<String, String> body) {
        return studentService.addStudent(body.get("name"), body.get("surname"),
                body.get("email"), body.get("password"), body.get("type"));
    }

    @GetMapping("/get/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    //get by email
    @GetMapping("/get/email/{email}")
    public Student getStudentByEmail(@PathVariable String email) {
        return studentService.getStudentByEmail(email);
    }

}