package net.thingswithstuff.CountryInfoApp.controller;

import net.thingswithstuff.CountryInfoApp.model.CountryInfoResponse;
import net.thingswithstuff.CountryInfoApp.service.CountryInfo.CountryInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/country")
public class CountryInfoController {

    @Autowired
    private CountryInfoService service;

    @RequestMapping(value = "/cca2/{cca2}", method = RequestMethod.GET)
    public CountryInfoResponse getByCca2(@PathVariable String cca2) {
        return service.getSingleCountry(cca2);
    }

    @RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
    public CountryInfoResponse getByName(@PathVariable String name) { return service.getSingleCountryByName(name);}
}
