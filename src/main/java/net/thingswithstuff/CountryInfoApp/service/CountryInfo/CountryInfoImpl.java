package net.thingswithstuff.CountryInfoApp.service.CountryInfo;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.PathNotFoundException;
import com.jayway.jsonpath.TypeRef;
import net.thingswithstuff.CountryInfoApp.model.CountryInfoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;

@Service
public class CountryInfoImpl implements CountryInfoService {


    private static final String queryURL = "https://restcountries.com/v3.1/alpha/";
    private static final String queryFields = "?fields=name,cca2,capital,population,region,subregion,languages,currencies,flags";
    private final HashMap<String, CountryInfoResponse> storedResponses = new HashMap<>();
    private final RestTemplate template;

    @Autowired
    public CountryInfoImpl(RestTemplate template) {
        this.template = template;
    }


    private String getResponseString(String cca2) {
        return template.getForObject(String.format("%s%s%s", queryURL, cca2, queryFields), String.class);
    }

    /**
     * Attempt to map a json value based on the given path and return the default if the path is invalid or
     * the retrieved value is not the correct type
     * @param document json document to read
     * @param path json path to query
     * @param type expected type
     * @param defaultValue val to return in an exception situation
     * @return mapped value
     */
    private <T> T mapJsonValue(Object document, String path, Class<T> type, T defaultValue) {
        try {
            Object val = JsonPath.read(document, path);
            if (type.isInstance(val)) {
                return type.cast(val);
            } else {
                return defaultValue;
            }
        } catch (PathNotFoundException e) {
            return defaultValue;
        }
    }

    private CountryInfoResponse parseResponse(String jsonResponse) {
        final Object document = Configuration.defaultConfiguration().jsonProvider().parse(jsonResponse);
        return CountryInfoResponse.builder()
                .nameCommon(mapJsonValue(document , "$.name.common", String.class, ""))
                .nameOfficial(mapJsonValue(document , "$.name.official", String.class, ""))
                .cca2(mapJsonValue(document , "$.cca2", String.class, ""))
                .capital(mapJsonValue(document , "$.capital.[0]", String.class, ""))
                .population(mapJsonValue(document , "$.population", Integer.class, 0))
                .region(mapJsonValue(document , "$.region", String.class, ""))
                .subRegion(mapJsonValue(document , "$.subregion", String.class, ""))
                .languages(mapJsonValue(document, "$.languages.*", List.class, Collections.emptyList()))
                .currencies(mapJsonValue(document, "$.currencies.*.name", List.class, Collections.emptyList()))
                .flagUrl(mapJsonValue(document, "$.flags.png", String.class, ""))
                .flagAltText(mapJsonValue(document, "$.flags.alt", String.class, ""))
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
