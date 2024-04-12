package net.thingswithstuff.CountryInfoApp.service.CountryInfo;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import net.thingswithstuff.CountryInfoApp.model.CountryInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;

@Service
public class CountryInfoImpl implements CountryInfoService {


    private static final String queryURL = "https://restcountries.com/v3.1/alpha/";
    private final HashMap<String, CountryInfoResponse> storedResponses = new HashMap<>();
    private final RestTemplate template;

    @Autowired
    public CountryInfoImpl(RestTemplate template) {
        this.template = template;
    }


    private String getResponseString(String cca2) {
        return template.getForObject(String.format("%s%s", queryURL, cca2), String.class);
    }

    private CountryInfoResponse parseResponse(String jsonResponse) {
        final Object document = Configuration.defaultConfiguration().jsonProvider().parse(jsonResponse);
        return CountryInfoResponse.builder()
                .nameCommon(JsonPath.read(document , "$.[0].name.common"))
                .nameOfficial(JsonPath.read(document , "$.[0].name.official"))
                .cca2(JsonPath.read(document , "$.[0].cca2"))
                .capital(JsonPath.read(document , "$.[0].capital.[0]"))
                .population(JsonPath.read(document , "$.[0].population"))
                .region(JsonPath.read(document , "$.[0].region"))
                .subRegion(JsonPath.read(document , "$.[0].subregion"))
                .languages(JsonPath.read(document, "$.[0].languages.*"))
                .currencies(JsonPath.read(document, "$.[0].currencies.*.name"))
                .flagUrl(JsonPath.read(document, "$.[0].flags.png"))
                .flagAltText(JsonPath.read(document, "$.[0].flags.alt"))
                .build();
    }

    @Override
    public CountryInfoResponse getSingleCountry(String cca2) {
        if (cca2.length() != 2) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid country code length");
        }
        if (!storedResponses.containsKey(cca2)) {
            String jsonResponse;
            try {
                jsonResponse = getResponseString(cca2);
            } catch (HttpClientErrorException e) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, String.format("Country code (%s) not found", cca2));
            } catch (RestClientException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error retrieving country information.");
            }
            final CountryInfoResponse response = parseResponse(jsonResponse);
            storedResponses.put(cca2, response);
        }
        return storedResponses.get(cca2);
    }

    @Override
    public List<CountryInfoResponse> getMultipleCountries(List<String> cca2) {
        return null;
    }
}
