// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var locationFormEl = document.querySelector("#location-form");
var nameInputEl = document.querySelector("#location");
var weatherContainerEl = document.querySelector("#weather-container");
var locationSearchTerm = document.querySelector("#weather-search-term");

var getWeather = function (city) {
    // format the openweather api url
    // var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=' + city + '&appid=2233fda853b9a2c75e41ce5024c239aa';
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',us&APPID=2233fda853b9a2c75e41ce5024c239aa';

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayInfo(data, city);
        });
    });
};
// getWeather()

var formSubmitHandler = function (event) {
    event.preventDefault();
        // get value from input element
        var location = nameInputEl.value.trim();

        if (location) {
        getWeather(location);
        nameInputEl.value = "";
        } else {
        alert("Please enter the name of a city");
        }
    console.log(event);
}

var displayInfo = function(info, searchTerm) {
    // clear old content
    weatherContainerEl.textContent = "";
    locationSearchTerm.textContent = searchTerm;

    console.log(info);
    console.log(searchTerm);
}

locationFormEl.addEventListener("submit", formSubmitHandler);


524901