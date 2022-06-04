/*⏰Display time with JS*/

let now = new Date();
let fullDate = document.querySelector("#full-date");
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

let hours = now.getHours();
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : "0" + minutes;

fullDate.innerHTML = `${day}, ${month} ${date}`;
time.innerHTML = `${hours}:${minutes}`;

/*🙀 Temp from farenheit to celsisus */

function toCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("h2");
  celsius.innerHTML = "14";
}

function toFareheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector("h2");
  farenheit.innerHTML = "45";
}

let displayFareheit = document.querySelector("#farenheit");
displayFareheit.addEventListener("click", toFareheit);

let displayCelsius = document.querySelector("#celsius");
displayCelsius.addEventListener("click", toCelsius);

/* challenge 5 js */ 
/* Get real time data */

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let apiKey = `916029c18f38059112f6c7dca6e3f10d`;
  let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&&units=metric`;
  axios.get(urlKey).then(updateTemperature);
}

function updateTemperature(response){
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${Math.round(response.data.main.temp)}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`
}

let form = document.querySelector("#search-city");
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
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${Math.round(response.data.main.temp)}`;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`
}

let locationButton = document.querySelector("#getLocation");
locationButton.addEventListener("click", handlePosition);
