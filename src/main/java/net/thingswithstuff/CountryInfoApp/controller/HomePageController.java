package net.thingswithstuff.CountryInfoApp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomePageController {


    @GetMapping(value = {"/", "/countries", "/regions", "/demographics"})
    public String index() {
        return "index";
    }
}
