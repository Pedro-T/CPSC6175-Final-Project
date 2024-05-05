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
import java.util.List;

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
        when(template.getForObject(eq("https://restcountries.com/v3.1/alpha/us?fields=name,cca2,capital,population,region,subregion,languages,currencies,flags"), eq(String.class))).thenReturn(mockExternalResponse);
        CountryInfoResponse appResponse = service.getSingleCountry(cca2);

        assertAll(
                () -> assertEquals("United States", appResponse.getNameCommon()),
                () -> assertEquals("United States of America", appResponse.getNameOfficial()),
                () -> assertEquals("US", appResponse.getCca2()),
                () -> assertEquals("Washington, D.C.", appResponse.getCapital()),
                () -> assertEquals(329484123, appResponse.getPopulation()),
                () -> assertEquals("Americas", appResponse.getRegion()),
                () -> assertEquals("North America", appResponse.getSubRegion()),
                () -> assertEquals(1, appResponse.getLanguages().size()),
                () -> assertEquals("English", appResponse.getLanguages().get(0)),
                () -> assertEquals(1, appResponse.getCurrencies().size()),
                () -> assertEquals("United States dollar", appResponse.getCurrencies().get(0)),
                () -> assertEquals("https://flagcdn.com/w320/us.png", appResponse.getFlagUrl()),
                () -> assertEquals("The flag of the United States of America is composed of thirteen equal " +
                        "horizontal bands of red alternating with white. A blue rectangle, bearing fifty small " +
                        "five-pointed white stars arranged in nine rows where rows of six stars alternate with rows " +
                        "of five stars, is superimposed in the canton.", appResponse.getFlagAltText())
        );
    }

    /**
     * Test for handling of country detail response where currency or language attributes have multiple values
     * @throws IOException
     */
    @Test
    void multipleLanguageCurrencyLists() throws IOException {
        final String cca2 = "zz";
        final String mockExternalResponse = new String(Files.readAllBytes(Paths.get("src/test/resources/fake-responses/multi-item-currency-language.json")));
        when(template.getForObject(eq("https://restcountries.com/v3.1/alpha/zz?fields=name,cca2,capital,population,region,subregion,languages,currencies,flags"), eq(String.class))).thenReturn(mockExternalResponse);
        final CountryInfoResponse appResponse = service.getSingleCountry(cca2);

        final List<String> languages = appResponse.getLanguages();
        assertAll(
                () -> assertEquals(2, languages.size()),
                () -> assertEquals("English", languages.get(0)),
                () -> assertEquals("French", languages.get(1))
        );

        final List<String> currencies = appResponse.getCurrencies();
        assertAll(
                () -> assertEquals(3, currencies.size()),
                () -> assertEquals("United States dollar", currencies.get(0)),
                () -> assertEquals("Fake Other Dollar", currencies.get(1)),
                () -> assertEquals("Fake Third Dollar", currencies.get(2))
        );
    }

    @Test
    void partialDetailsResponse() throws IOException {
        final String cca2 = "aq";
        final String mockExternalResponse = new String(Files.readAllBytes(Paths.get("src/test/resources/fake-responses/single-country-partial.json")));
        when(template.getForObject(eq("https://restcountries.com/v3.1/alpha/aq?fields=name,cca2,capital,population,region,subregion,languages,currencies,flags"), eq(String.class))).thenReturn(mockExternalResponse);
        final CountryInfoResponse appResponse = service.getSingleCountry(cca2);

        assertAll(
                () -> assertEquals("Antarctica", appResponse.getNameCommon()),
                () -> assertEquals("Antarctica", appResponse.getNameOfficial()),
                () -> assertEquals("AQ", appResponse.getCca2()),
                () -> assertEquals("", appResponse.getCapital()),
                () -> assertEquals(1000, appResponse.getPopulation()),
                () -> assertEquals("Antarctic", appResponse.getRegion()),
                () -> assertEquals("", appResponse.getSubRegion()),
                () -> assertEquals(0, appResponse.getLanguages().size()),
                () -> assertEquals(0, appResponse.getCurrencies().size()),
                () -> assertEquals("https://flagcdn.com/w320/aq.png", appResponse.getFlagUrl()),
                () -> assertEquals("", appResponse.getFlagAltText())
        );
    }
}
