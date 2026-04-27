let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date1 = document.querySelector(".date");
date1.innerHTML = `${days[now.getDay()]} ${now.getHours()}:${now.getMinutes()}`;

function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input");
  let city = document.querySelector(".city");
  city.innerHTML = `${cityInput.value}`;
  let cityName = cityInput.value;
  searchCity(cityName);
}

function searchCity(cityName) {
  console.log(cityName);
  let apiKey = "a0aca8t7806acb2cb338fb20fbc444o1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  console.log(Math.round(response.data.temperature.current));
  let temperature = document.querySelector(".temperatureValue");
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}`;
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", submitCity);
