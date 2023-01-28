package org.teamscript.LinkedHU_CENG.service;

import org.springframework.stereotype.Service;

import org.teamscript.LinkedHU_CENG.config.Constants;


@Service
public class AdministratorService {

    public AdministratorService(){

    }
    public static boolean login(String username, String password) {
        return username.equals(Constants.ADMIN_USERNAME) && password.equals(Constants.ADMIN_PASSWORD);
    }
}
