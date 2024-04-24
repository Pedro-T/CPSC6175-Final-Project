package net.thingswithstuff.CountryInfoApp.service.CountryListing;

import net.thingswithstuff.CountryInfoApp.model.CountryNamesResponse;

import java.util.List;

public interface CountryListingService {

    List<CountryNamesResponse> getAll();

    List<CountryNamesResponse> getForRegion(String region);

    List<CountryNamesResponse> getForLanguage(String language);

    List<CountryNamesResponse> getForCurrency(String currency);

}
