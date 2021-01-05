function displayHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
    return `${hours}:${minutes}`;
}

function displayDate(timestamp) {
    let date = new Date(timestamp);
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}

let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
 let temperatureInfo = document.querySelector("#temperature");
  let cityInfo = document.querySelector("#city");
let countryInfo = document.querySelector("#country");
  let descriptionInfo = document.querySelector("#description");
  let humidityInfo = document.querySelector("#humidity");
  let windInfo = document.querySelector("#wind");
  let dateInfo = document.querySelector("#date");
  let iconInfo = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureInfo.innerHTML = Math.round(celsiusTemperature);
  cityInfo.innerHTML = response.data.name;
  countryInfo.innerHTML = displayCountry(response.data.sys.country);
  descriptionInfo.innerHTML = response.data.weather[0].description;
  humidityInfo.innerHTML = response.data.main.humidity;
  windInfo.innerHTML = Math.round(response.data.wind.speed);
  dateInfo.innerHTML = displayDate(response.data.dt * 1000);
  iconInfo.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "d9880783c80563d424de115efab499a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastInfo = document.querySelector("#forecast");
  forecastInfo.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastInfo.innerHTML += `
    <div class="col-2">
      <h3>
        ${displayHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "d9880783c80563d424de115efab499a0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
  
apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showFahrenheit(event) {
event.preventDefault();
let fahrentheitTemperature = (celsiusTemperature * 9) / 5 + 32;
let temperatureInfo = document.querySelector("#temperature");
temperatureInfo.innerHTML = Math.round(fahrentheitTemperature);
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");

}

function showCelsius(event) {
event.preventDefault();
let temperatureInfo = document.querySelector("#temperature");
temperatureInfo.innerHTML = Math.round(celsiusTemperature);
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemperature = null;

searchCity("Amsterdam");