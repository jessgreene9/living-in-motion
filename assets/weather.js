var apiKey = "2f5fe5c63f4f11da53f650c0726010f9";
var weatherContainerEl = document.querySelector("#weather-container");
var searchFormEl = document.querySelector(".search-form");

function getWeather(cityName) {
    console.log(cityName);
    var apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {


            var sevenDayUrl =
                "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + apiKey;
            fetch(sevenDayUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (sevenDayData) {
                    console.log(sevenDayData);
                    showSevenDay(sevenDayData);
                });
        });
}

function showSevenDay(data) {
    var weatherContainerEl = document.querySelector("#weather-container");;

    weatherContainerEl.innerHTML = "";
    var sevenDayArray = data.daily.slice(0, 7);
    sevenDayArray.forEach(function (day) {
        console.log(day.temp.day);
        var sevenDayDateEl = document.createElement("h3");
        var sevenDescription = document.createElement("img");
        var precipitationEl = document.createElement("p");
        var sevenTempEl = document.createElement("p");
        var sevenHumidityEl = document.createElement("p");
        var sevenWindEl = document.createElement("p");
        // var yourDate = new Date(day.dt * 1000);
        console.log(precipitationEl);

        sevenDayDateEl.textContent = moment.unix(day.dt).format("MMM D, YYYY");
        sevenDayDateEl.setAttribute("style", "font-size: 16px");
        sevenDescription.src =
            "https://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png";
        precipitationEl.textContent = "Precipitation: " + day.pop * 100 + "%";
        sevenTempEl.textContent = "Temp: " + day.temp.day + " °F";
        sevenHumidityEl.textContent = "Humidity: " + day.humidity + "%";
        sevenWindEl.textContent = "Wind: " + day.wind_speed + " MPH";

        var weatherBox = document.createElement("div");
        weatherBox.classList.add("boxes");
        weatherContainerEl.appendChild(weatherBox);
        weatherBox.append(
            sevenDayDateEl,
            sevenDescription,
            precipitationEl,
            sevenTempEl,
            sevenHumidityEl,
            sevenWindEl
        );
    });
};


searchFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityInput = document.querySelector("#input-city").value;

    getWeather(cityInput);

});