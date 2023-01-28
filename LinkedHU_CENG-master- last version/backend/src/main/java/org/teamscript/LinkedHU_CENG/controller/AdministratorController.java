package org.teamscript.LinkedHU_CENG.controller;


import org.springframework.web.bind.annotation.*;

import org.teamscript.LinkedHU_CENG.service.AdministratorService;

@RestController
@RequestMapping("/api/v1/admin")
public class AdministratorController {

    private final AdministratorService administratorService;


    public AdministratorController(AdministratorService administratorService) {
        this.administratorService = administratorService;
    }


    @PostMapping("/login")
    public Boolean login(@RequestParam String username, @RequestParam String password) {
        return AdministratorService.login(username, password);
    }

}