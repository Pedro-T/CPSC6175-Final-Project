package net.thingswithstuff.CountryInfoApp.service.CountryInfo;

import net.thingswithstuff.CountryInfoApp.model.CountryInfoResponse;

import java.util.List;

public interface CountryInfoService {

    CountryInfoResponse getSingleCountry(String cca2);
    List<CountryInfoResponse> getMultipleCountries(List<String> cca2List);
}
