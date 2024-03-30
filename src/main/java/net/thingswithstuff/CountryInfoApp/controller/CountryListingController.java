package net.thingswithstuff.CountryInfoApp.controller;

import net.thingswithstuff.CountryInfoApp.model.CountryNamesResponse;
import net.thingswithstuff.CountryInfoApp.service.CountryListing.CountryListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
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

}
