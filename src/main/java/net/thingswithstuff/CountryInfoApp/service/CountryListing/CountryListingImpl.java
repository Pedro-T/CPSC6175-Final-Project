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

    private static final String ALL_QUERY_URL = "https://restcountries.com/v3.1/all?fields=name,cca2";
    private static final String REGION_QUERY_URL = "https://restcountries.com/v3.1/region/";
    private static final String CURRENCY_QUERY_URL = "https://restcountries.com/v3.1/currency/";

    private final Map<String, List<CountryNamesResponse>> storedRegionResponses = new HashMap<>();
    private final Map<String, List<CountryNamesResponse>> storedCurrencyResponses = new HashMap<>();
    private final RestTemplate template;

    @Autowired
    public CountryListingImpl(RestTemplate template) {
        this.template = template;
    }

    @Override
    public List<CountryNamesResponse> getAll() {
        throw new ResponseStatusException(HttpStatus.NOT_IMPLEMENTED, "All Countries functionality not yet implemented");
    }

    @Override
    public List<CountryNamesResponse> getForRegion(String region) {
        return getResponse(region, REGION_QUERY_URL, storedRegionResponses);
    }

    @Override
    public List<CountryNamesResponse> getForCurrency(String currency) {
        return getResponse(currency, CURRENCY_QUERY_URL, storedCurrencyResponses);
    }

    /**
     * Request a list of country name objects from a given base URL (see class constants) with a supplied key
     * If the response is already cached, returns the cached response from the map
     * If not cached then requests the data from the external API, attempts to parse, stores response in cache
     * @param key key to append to the base url such as a region name
     * @param baseURL base url to use for the request, functionally defining the type of key supplied
     * @param cacheMap reference to the appropriate map storing cached responses
     * @return list of CountryNamesResponse objects relevant to the request type and key
     * @throws ResponseStatusException in the event of invalid request keys, unreachable API, or parsing error
     */
    private List<CountryNamesResponse> getResponse(String key, String baseURL, Map<String, List<CountryNamesResponse>> cacheMap) {
        if (!cacheMap.containsKey(key)) {
            final String request = String.format("%s%s?fields=name,cca2", baseURL, key);
            try {
                final String jsonResponse = template.getForObject(request, String.class);
                cacheMap.put(key, parseResponse(jsonResponse));
            } catch (HttpClientErrorException e) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid request value / result not found");
            } catch (RestClientException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error retrieving country list.");
            }
        }
        return cacheMap.get(key);
    }

    /**
     * Process the response string receive to map to individual CountryNamesResponse objects
     * @param jsonResponse response from external API in String form
     * @return list of CountryNamesResponse objects mapped from parsed data
     */
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
                            .build()
            );
        }
        return responses;
    }

}
