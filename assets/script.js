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
var temperature = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var uvIndex = document.querySelector('#uv-index');
var forecast = document.querySelectorAll('.forecast');
var savedSearches = document.querySelector("#savedSearches");

var getWeather = function (city) {

    var searches = localStorage.getItem("RecentSearches")? JSON.parse(localStorage.getItem("RecentSearches")):[]
    var flag = false
        if (searches) {
            for (var i = 0; i < searches.length; i++) {
                if (searches[i] === city) flag = true
            }
        }

        if (searches.length === 0) {
            savedSearches.appendChild(document.createElement("select"))
            var option = document.createElement("option")
                option.value = city
                option.textContent = city
                savedSearches.lastChild.addEventListener("change", () => {
                    getWeather(savedSearches.lastChild.value)
                })
                savedSearches.lastChild.appendChild(option)
                searches.push(city)
                localStorage.setItem("RecentSearches", JSON.stringify(searches))
        }
            else if (!flag) {
            var option = document.createElement("option")
                option.value = city
                option.textContent = city
                savedSearches.lastChild.appendChild(option)
                searches.push(city)
                localStorage.setItem("RecentSearches", JSON.stringify(searches))
            }
        

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
                            console.log(data1);
        
                            var info = {
                                temperature: data1.main.temp,
                                humidity: data1.main.humidity,
                                cityName: data1.name,
                                windspeed: data1.wind.speed,
                                uvindex: data3.value,
                                forecast: data2.list.filter((element, i) => i === 4 || i === 12 || i === 20 || i === 28 || i === 36)
                            }
                            console.log(info)
                           displayInfo(info);
                        })
                    })
                })
            })
        });
    });
};

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

var displayInfo = function(info) {
    temperature.textContent = `${Math.floor(parseFloat(info.temperature) - 273.15) * 9/5 + 32} °F`
    humidity.textContent = info.humidity
    windSpeed.textContent = info.windspeed
    uvIndex.textContent = info.uvindex
    locationSearchTerm.textContent = info.cityName
    console.log(forecast[0].children)

// adding icons to 5 day forecast
    for (var i = 0; i < info.forecast.length; i++) {
        var iconurl = "http://openweathermap.org/img/w/" + info.forecast[i].weather[0].icon + ".png";
        forecast[i].children[0].textContent = info.forecast[i].dt_txt
        forecast[i].children[1].src = iconurl
        forecast[i].children[2].firstChild.textContent = `Temp: ${Math.floor(parseFloat(info.forecast[i].main.temp) - 273.15) * 9/5 + 32} °F`
        forecast[i].children[3].firstChild.textContent = 'Humidity: ' + info.forecast[i].main.humidity
    }

    console.log(info);
}

// recording recent searches
var searches = JSON.parse(localStorage.getItem("RecentSearches"))
console.log(searches)
    if (searches) {
        savedSearches.appendChild(document.createElement("select"))
        for (var i = 0; i < searches.length; i++) {
            var option = document.createElement("option")
            option.value = searches[i]
            option.textContent = searches[i]
            savedSearches.lastChild.addEventListener("change", () => {
                getWeather(savedSearches.lastChild.value)
            })
            savedSearches.lastChild.appendChild(option)
        }
    }


locationFormEl.addEventListener("submit", formSubmitHandler);

