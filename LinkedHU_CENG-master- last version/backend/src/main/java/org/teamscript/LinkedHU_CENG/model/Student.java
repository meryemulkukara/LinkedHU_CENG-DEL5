package org.teamscript.LinkedHU_CENG.model;

import lombok.NoArgsConstructor;
import javax.persistence.*;


@NoArgsConstructor
@Entity
@Table(name = "student")
public class Student extends User {

    private StudentType type;

    public Student(String name, String surname, String email, String password, StudentType type) {

        super(name, surname, email, password);
        this.type = type;
    }
    public StudentType getType() {
        return type;
    }

    public void setType(StudentType type) {
        this.type = type;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        Student student = (Student) o;

        return type == student.type && this.id.equals(student.id) && this.email.equals(student.email);
    }


}
