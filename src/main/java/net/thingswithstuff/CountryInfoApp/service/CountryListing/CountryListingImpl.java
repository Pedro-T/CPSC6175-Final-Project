package net.thingswithstuff.CountryInfoApp.service.CountryListing;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import net.thingswithstuff.CountryInfoApp.model.CountryNamesResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CountryListingImpl implements CountryListingService {

    private static final String allQueryURL = "https://restcountries.com/v3.1/all?fields=name,cca2";
    private static final String regionQueryURL = "https://restcountries.com/v3.1/region/";
    private static final String currencyQueryURL = "https://restcountries.com/v3.1/currency/";

    private final Map<String, List<CountryNamesResponse>> storedRegionResponses = new HashMap<>();
    private final Map<String, List<CountryNamesResponse>> storedCurrencyResponses = new HashMap<>();
    private final RestTemplate template;

    @Autowired
    public CountryListingImpl(RestTemplate template) {
        this.template = template;
    }


    private List<CountryNamesResponse> parseResponse(String jsonResponse) {
        final List<CountryNamesResponse> responses = new ArrayList<>();
        final Object document = Configuration.defaultConfiguration().jsonProvider().parse(jsonResponse);
        int length = JsonPath.read(document, "$.length()");
        for (int i = 0; i < length; i++) {
            responses.add(
                    CountryNamesResponse.builder()
                    .nameCommon(JsonPath.read(document, String.format("$.[%d].name.common", i)))
                    .nameOfficial(JsonPath.read(jsonResponse, String.format("$.[%d].name.official", i)))
                    .cca2(JsonPath.read(jsonResponse, String.format("$.[%d].cca2", i)))
                    .build());
        }
        return responses;
    }

    @Override
    public List<CountryNamesResponse> getAll() {
        throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "All Countries functionality not yet implemented");
    }

    private List<CountryNamesResponse> getResponse(String key, String baseURL, Map<String, List<CountryNamesResponse>> cacheMap) {
        if (!cacheMap.containsKey(key)) {
            final String request = String.format("%s%s", baseURL, key);
            try {
                final String jsonResponse = template.getForObject(request, String.class);
                storedRegionResponses.put(key, parseResponse(jsonResponse));
            } catch (HttpClientErrorException e) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid request value / result not found");
            } catch (RestClientException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error retrieving country list.");
            }
        }
        return cacheMap.get(key);
    }

    @Override
    public List<CountryNamesResponse> getForRegion(String region) {
        return getResponse(region, regionQueryURL, storedRegionResponses);
    }

    @Override
    public List<CountryNamesResponse> getForCurrency(String currency) {
        return getResponse(currency, currencyQueryURL, storedCurrencyResponses);
    }
}
