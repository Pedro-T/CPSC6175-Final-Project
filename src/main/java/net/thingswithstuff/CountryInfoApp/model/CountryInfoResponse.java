package net.thingswithstuff.CountryInfoApp.model;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class CountryInfoResponse {

    private String nameCommon;
    private String nameOfficial;
    private String cca2;
    private String capital;
    private int population;
    private String region;
    private String subRegion;
    private List<String> languages;
    private List<String> currencies;
    private String flagUrl;
    private String flagAltText;
}
