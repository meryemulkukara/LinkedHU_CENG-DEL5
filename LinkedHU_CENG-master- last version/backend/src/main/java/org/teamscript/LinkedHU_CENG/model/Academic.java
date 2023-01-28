package org.teamscript.LinkedHU_CENG.model;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="academic")
@NoArgsConstructor
public class Academic extends User {

    @Id
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @GeneratedValue(generator = "uuid")
    @Column(name = "id", updatable = false, nullable = false)
    protected String id;


    public Academic(String name, String surname, String email, String password) {

    }
}
