package net.thingswithstuff.CountryInfoApp.controller;

import net.thingswithstuff.CountryInfoApp.model.CountryNamesResponse;
import net.thingswithstuff.CountryInfoApp.service.CountryListing.CountryListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/countrylist")
public class CountryListingController {

    @Autowired
    private CountryListingService service;

    @RequestMapping(value = "/all", method = RequestMethod.GET)
    public List<CountryNamesResponse> getAllNames() {
        return service.getAll();
    }

    @RequestMapping(value = "/region/{regionName}", method = RequestMethod.GET)
    public List<CountryNamesResponse> getNamesByRegion(@PathVariable String regionName) {
        return service.getForRegion(regionName);
    }

    @RequestMapping(value = "/language/{language}", method = RequestMethod.GET)
    public List<CountryNamesResponse> getNamesByLanguage(@PathVariable String language) {
        return service.getForLanguage(language);
    }

    @RequestMapping(value = "/currency/{currencyName}", method = RequestMethod.GET)
    public List<CountryNamesResponse> getNamesByCurrency(@PathVariable String currencyName) {
        return service.getForCurrency(currencyName);
    }

}
