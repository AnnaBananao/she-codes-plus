/* ✨ display live temperature and time at opening */
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let time = document.querySelector("#time");
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  let month = months[now.getMonth()]; 

  return `${day}, ${month} ${date}`;
}

function formatTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  hours = hours > 9 ? hours : "0" + hours;
  let minutes = now.getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;
  
  return `${hours}:${minutes}`;
}

function displayLiveTemperature(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let date = document.querySelector("#full-date");
  let time = document.querySelector("#time");
  let icon = document.querySelector("#icon");

  celsiusTemperature = `${Math.round(response.data.main.temp)}`;
  
  city.innerHTML = `${cityName}`
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  date.innerHTML = formatDate(response.data.dt * 1000);
  time.innerHTML = `Last updated at ${formatTime(response.data.dt * 1000)}`;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", `${response.data.weather[0].description}`)
}

let cityName = "New York";
let apiKey = `916029c18f38059112f6c7dca6e3f10d`;
let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;
axios.get(urlKey).then(displayLiveTemperature);

/*🙀 Temp from farenheit to celsisus */

function toCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  displayCelsius.classList.add("active");
  displayFareheit.classList.remove("active");
}

function toFareheit(event) {
  event.preventDefault();
  let farenheitTemp = (celsiusTemperature * 9/5) + 32;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(farenheitTemp);
  displayCelsius.classList.remove("active");
  displayFareheit.classList.add("active");
}

let celsiusTemperature = null;
let displayFareheit = document.querySelector("#farenheit");
let displayCelsius = document.querySelector("#celsius");

displayFareheit.addEventListener("click", toFareheit);
displayCelsius.addEventListener("click", toCelsius);

/* Get real time data */

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let apiKey = `916029c18f38059112f6c7dca6e3f10d`;
  let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(urlKey).then(updateTemperature);
}

function updateTemperature(response){
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  celsiusTemperature = `${Math.round(response.data.main.temp)}`;

  
  city.innerHTML = `${response.data.name}`;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}

let searchButton = document.querySelector("#search-button");
let form = document.querySelector("#search-city");
searchButton.addEventListener("click", searchCity);
form.addEventListener("submit", searchCity);

/* Get temperature from location */

function handlePosition() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

function getLocation(position){
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = `916029c18f38059112f6c7dca6e3f10d`;
  let urlKey = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(urlKey).then(retrieveTempLocation);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `916029c18f38059112f6c7dca6e3f10d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
}

function retrieveTempLocation(response){
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#icon");
  celsiusTemperature = `${Math.round(response.data.main.temp)}`;

  city.innerHTML = `${response.data.name}`;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  description.innerHTML = `${response.data.weather[0].description}`;
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);
}

let locationButton = document.querySelector("#getLocation");
locationButton.addEventListener("click", handlePosition);

/* weather forecast HTML/CSS */

function displayForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML = forecastHTML +
    `<div class="col-2">
    <div class="small-cards">
    <div class="card-body">
      <h3 class="card-title">${day}</h3>
      <img
      class="small-images"
      src="src/sun.jpg"
      alt="Small image of sun"
      />
      <p class="card-text">
        <span class="max-temp">7&deg; </span>
        <span class="min-temp">-3&deg;</span>
      </p>
    </div>
    </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

displayForecast();