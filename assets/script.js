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
    var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=2233fda853b9a2c75e41ce5024c239aa'

    // make a request to the url
    fetch(apiUrl).then(function(response1) {
        response1.json().then(function(data1) {
            var forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=2233fda853b9a2c75e41ce5024c239aa'
            fetch(forecastUrl).then(function(response2) {
                response2.json().then(function(data2) {
                    var uviUrl = 'http://api.openweathermap.org/data/2.5/uvi?lat=' + data2.city.coord.lat + '&lon=' + data2.city.coord.lon + '&appid=2233fda853b9a2c75e41ce5024c239aa';
                    fetch(uviUrl).then(function(response3) {
                        response3.json().then(function(data3) {
                            
                            console.log(data1)
                            console.log(data2)
                            console.log(data3)
        
                            var info = {
                                temperature: data1.main.temp,
                                humidity: data1.main.humidity,
                                windspeed: data1.wind.speed,
                                uvindex: data3.value
                            }
                           // displayInfo(data, city);
                        })
                    })
                })
            })
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

    // loop over info
    for (var i = 0; i < info.length; i++) {
        // format repo name
        var infoName = info[i].owner.login + "/" + info[i].name;
    
        // create a container for each repo
        var infoEl = document.createElement("div");
        infoEl.classList = "list-item flex-row justify-space-between align-center";
    
        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = infoName;
    
        // append to container
        infoEl.appendChild(titleEl);
    
        // append container to the dom
        weatherContainerEl.appendChild(infoEl);
    }

    console.log(info);
    console.log(searchTerm);
}



locationFormEl.addEventListener("submit", formSubmitHandler);

