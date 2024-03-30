package net.thingswithstuff.CountryInfoApp;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import net.thingswithstuff.CountryInfoApp.model.CountryInfoResponse;
import net.thingswithstuff.CountryInfoApp.service.CountryInfo.CountryInfoImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@ExtendWith(MockitoExtension.class)
public class TestSingleCountryDetails {

    @Mock
    private RestTemplate template;

    @InjectMocks
    private CountryInfoImpl service;

    @Test
    void testSingleCountryValidResponse() throws IOException {
        final String cca2 = "us";
        final String mockExternalResponse = new String(Files.readAllBytes(Paths.get("src/test/resources/fake-responses/single-country-us-full.json")));
        when(template.getForObject(eq("https://restcountries.com/v3.1/alpha/us"), eq(String.class))).thenReturn(mockExternalResponse);
        CountryInfoResponse appResponse = service.getSingleCountry(cca2);

        assertAll(
                () -> assertEquals("United States", appResponse.getNameCommon()),
                () -> assertEquals("United States of America", appResponse.getNameOfficial()),
                () -> assertEquals("US", appResponse.getCca2()),
                () -> assertEquals("Washington, D.C.", appResponse.getCapital()),
                () -> assertEquals(329484123, appResponse.getPopulation()),
                () -> assertEquals("Americas", appResponse.getRegion()),
                () -> assertEquals("North America", appResponse.getSubRegion())
        );
    }
}
