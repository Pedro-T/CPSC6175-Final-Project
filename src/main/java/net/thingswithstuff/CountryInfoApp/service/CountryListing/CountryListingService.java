package net.thingswithstuff.CountryInfoApp.service.CountryListing;

import net.thingswithstuff.CountryInfoApp.model.CountryNamesResponse;

import java.util.List;

public interface CountryListingService {

    List<CountryNamesResponse> getForRegion(String region);

    List<CountryNamesResponse> getForCurrency(String currency);

    List<CountryNamesResponse> getForLanguage(String language);

}
