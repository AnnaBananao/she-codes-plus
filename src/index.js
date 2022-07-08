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
  icon.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

let cityName = "New York";
let apiKey = `916029c18f38059112f6c7dca6e3f10d`;
let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;
axios.get(urlKey).then(displayLiveTemperature);

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

/* weather forecast HTML/CSS */

function getForecast(coordinates) {
  let apiKey = `916029c18f38059112f6c7dca6e3f10d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let locationButton = document.querySelector("#getLocation");
locationButton.addEventListener("click", handlePosition);

function formateDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  forecast.forEach(function (forecastDay, index) {
    if (index <= 5) {
      forecastHTML = forecastHTML +
      `<div class="col-2">
      <div class="small-cards">
      <div class="card-body">
        <h3 class="card-title">${formateDate(forecastDay.dt)}</h3>
        <img
        class="small-images"
        src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
        alt=""
        />
        <p class="card-text">
          <span class="max-temp">${Math.round(forecastDay.temp.max)}&deg; </span>
          <span class="min-temp">${Math.round(forecastDay.temp.min)}&deg;</span>
        </p>
      </div>
      </div>
      </div>`;
    }
    
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}