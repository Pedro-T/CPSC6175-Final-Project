package net.thingswithstuff.CountryInfoApp;

import net.thingswithstuff.CountryInfoApp.model.CountryNamesResponse;
import net.thingswithstuff.CountryInfoApp.service.CountryListing.CountryListingImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TestCountryList {

    @Mock
    private RestTemplate template;

    @InjectMocks
    private CountryListingImpl service;

    @Test
    void testCountryListByRegionValid() throws IOException {
        final String region = "antarctic";
        final String mockExternalResponse = new String(Files.readAllBytes(Paths.get("src/test/resources/fake-responses/region-antarctic-name-cca2.json")));
        when(template.getForObject(eq("https://restcountries.com/v3.1/region/antarctic?fields=name,cca2"), eq(String.class))).thenReturn(mockExternalResponse);
        final List<CountryNamesResponse> appResponse = service.getForRegion(region);

        assertEquals(2, appResponse.size());

        final CountryNamesResponse countryOne = appResponse.get(0);
        final CountryNamesResponse countryTwo = appResponse.get(1);

        assertAll(
                () -> assertEquals("Bouvet Island", countryOne.getNameCommon()),
                () -> assertEquals("Bouvet Island-official", countryOne.getNameOfficial()),
                () -> assertEquals("BV", countryOne.getCca2()),
                () -> assertEquals("French Southern and Antarctic Lands", countryTwo.getNameCommon()),
                () -> assertEquals("Territory of the French Southern and Antarctic Lands", countryTwo.getNameOfficial()),
                () -> assertEquals("TF", countryTwo.getCca2())
        );
    }

    @Test
    void testCountryListByCurrencyValid() throws IOException {
        final String currency = "usd";
        final String mockExternalResponse = new String(Files.readAllBytes(Paths.get("src/test/resources/fake-responses/currency-usd-trimmed.json")));
        when(template.getForObject(eq("https://restcountries.com/v3.1/currency/usd?fields=name,cca2"), eq(String.class))).thenReturn(mockExternalResponse);
        final List<CountryNamesResponse> appResponse = service.getForCurrency(currency);

        assertEquals(2, appResponse.size());

        final CountryNamesResponse countryOne = appResponse.get(0);
        final CountryNamesResponse countryTwo = appResponse.get(1);

        assertAll(
                () -> assertEquals("United States Minor Outlying Islands", countryOne.getNameCommon()),
                () -> assertEquals("United States Minor Outlying Islands", countryOne.getNameOfficial()),
                () -> assertEquals("UM", countryOne.getCca2()),
                () -> assertEquals("Turks and Caicos Islands", countryTwo.getNameCommon()),
                () -> assertEquals("Turks and Caicos Islands", countryTwo.getNameOfficial()),
                () -> assertEquals("TC", countryTwo.getCca2())
        );
    }

}
