package net.thingswithstuff.CountryInfoApp.service.CountryInfo;

import com.jayway.jsonpath.JsonPath;
import net.thingswithstuff.CountryInfoApp.model.CountryInfoResponse;
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
    private final HashMap<String, CountryInfoResponse> storedResponses;
    private final RestTemplate restTemplate = new RestTemplate();

    public CountryInfoImpl() {
        this.storedResponses = new HashMap<>();
    }

    private String getResponseString(String cca2) {
        return restTemplate.getForObject(String.format("%s%s", queryURL, cca2), String.class);
    }

    private CountryInfoResponse parseResponse(String jsonResponse) {
        return CountryInfoResponse.builder()
                .nameCommon(JsonPath.read(jsonResponse, "$.[0].name.common"))
                .nameOfficial(JsonPath.read(jsonResponse, "$.[0].name.official"))
                .cca2(JsonPath.read(jsonResponse, "$.[0].cca2"))
                .capital(JsonPath.read(jsonResponse, "$.[0].capital.[0]"))
                .population(JsonPath.read(jsonResponse, "$.[0].population"))
                .region(JsonPath.read(jsonResponse, "$.[0].region"))
                .subRegion(JsonPath.read(jsonResponse, "$.[0].subregion"))
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
