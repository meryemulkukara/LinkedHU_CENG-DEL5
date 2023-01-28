package org.teamscript.LinkedHU_CENG.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Setter
public class Administrator {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String username;
    private String password;

    public Administrator() {
    }

    public Administrator(String name, String username, String password) {
        this.name = name;
        this.username = username;
        this.password = password;
    }


}
