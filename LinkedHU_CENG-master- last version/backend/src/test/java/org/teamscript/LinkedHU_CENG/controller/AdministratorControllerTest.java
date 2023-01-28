package org.teamscript.LinkedHU_CENG.controller;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.teamscript.LinkedHU_CENG.config.Constants;
import org.teamscript.LinkedHU_CENG.service.AdministratorService;

import static org.junit.jupiter.api.Assertions.*;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AdministratorControllerTest {

    AdministratorController controller;


    @Test
    void Test1(){

        AdministratorService service = new AdministratorService();


        Constants.ADMIN_USERNAME = "admin";
        Constants.ADMIN_PASSWORD = "pass";

        controller = new AdministratorController(service);
        Boolean logged = controller.login("admin","pass");

        assertTrue(logged);
    }
}