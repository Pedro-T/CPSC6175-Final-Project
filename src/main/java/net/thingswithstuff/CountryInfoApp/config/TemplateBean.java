/**
 * Purpose of this class is to facilitate auto-wiring of RestTemplate in support of Mockito injection for testing
 */

package net.thingswithstuff.CountryInfoApp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class TemplateBean {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
