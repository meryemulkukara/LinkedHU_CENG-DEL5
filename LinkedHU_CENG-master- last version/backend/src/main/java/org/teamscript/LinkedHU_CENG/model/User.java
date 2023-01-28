package org.teamscript.LinkedHU_CENG.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Getter
@Setter
//@Inheritance(strategy = InheritanceType.JOINED)
@MappedSuperclass
@NoArgsConstructor
public abstract class User {
    @Id
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @GeneratedValue(generator = "uuid")
    @Column(name = "id", updatable = false, nullable = false)
    protected String id;


    protected String name;
    protected String surname;

    @Column(name="email", unique = true)
    protected String email;
    protected String password;

    protected User (String name, String surname, String email, String password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

}
