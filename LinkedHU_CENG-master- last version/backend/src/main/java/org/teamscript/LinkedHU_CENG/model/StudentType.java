package org.teamscript.LinkedHU_CENG.model;

public enum StudentType {
    UNDERGRADUATE("Undergraduate"),
    MASTER("Master"),
    PHD("PhD");

    private final String name;

    StudentType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public static StudentType fromString(String text) {

        if(text == null)
            return null;

        for (StudentType type : StudentType.values()) {
            if (type.name.equalsIgnoreCase(text)) {
                return type;
            }
        }
        return null;
    }
}
