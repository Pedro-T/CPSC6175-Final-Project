# Group Six

## Concept
Our app is designed to offer users an interactive way to learn about countries around the world. Through detailed country profiles, and customized search filters, users can explore the diversity of cultures, languages, geographies, and economies globally.

## API Used
REST Countries API at https://restcountries.com/

## Key Technologies
* React
* React-Router
* Zustand
* amCharts
* Spring Boot

## Setup
No API key is needed as the REST Countries API does not require one. Simply clone the repository and build/run. The application will default to port 8080.

```
mvn clean spring-boot:run
```

## Pages

### Home / Map
Allows the user to explore a world map (leveraging amCharts) to find countries that they wish to learn more about

### Country Info Page
Allows the user to enter a country name and retrieve information

### Region Search
Allows the user to search for countries by region

### Demographic Search
Allows the users to search for countries by shared language or currency
