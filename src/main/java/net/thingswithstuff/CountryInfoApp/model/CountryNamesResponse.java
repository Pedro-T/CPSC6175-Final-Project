package net.thingswithstuff.CountryInfoApp.model;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CountryNamesResponse {
    private String nameCommon;
    private String nameOfficial;
    private String cca2;
}
