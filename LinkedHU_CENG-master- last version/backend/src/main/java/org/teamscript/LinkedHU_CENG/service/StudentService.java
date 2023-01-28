package org.teamscript.LinkedHU_CENG.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import org.teamscript.LinkedHU_CENG.model.Student;
import org.teamscript.LinkedHU_CENG.model.StudentType;
import org.teamscript.LinkedHU_CENG.repository.StudentRepository;

import java.util.Optional;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student addStudent(String name, String surname, String email, String password, String type) {
        Student student = new Student(name, surname, email, password, StudentType.fromString(type));
        studentRepository.save(student);
        return student;
    }

    public Student getStudentById(String id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.orElse(null);
    }

    public Student getStudentByEmail(String email) {
        Optional<Student> student = studentRepository.findByEmail(email);
        return student.orElse(null);
    }


    public Iterable<Student> findAll() {
        return studentRepository.findAll();
    }

    public void deleteById(String id) {
        studentRepository.deleteById(id);
    }

    public void delete(Student student) {
        studentRepository.delete(student);
    }

    public void deleteAll() {
        studentRepository.deleteAll();
    }

    public JpaRepository<Student, String> getRepository() {
        return studentRepository;
    }
}