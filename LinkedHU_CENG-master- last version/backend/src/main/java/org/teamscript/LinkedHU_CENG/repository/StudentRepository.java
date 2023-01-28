package org.teamscript.LinkedHU_CENG.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.teamscript.LinkedHU_CENG.model.Student;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByEmail(String email);
}

