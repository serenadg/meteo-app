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

  let cityName = cityInput.value;
  searchCity(cityName);
}

function searchCity(cityName) {
  console.log(cityName);
  let apiKey = "a0aca8t7806acb2cb338fb20fbc444o1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(Math.round(response.data.temperature.current));
  let temperature = document.querySelector(".temperatureValue");
  let weatherDesc = document.querySelector(".weather-desc");
  let city = document.querySelector(".city");
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}`;
  weatherDesc.innerHTML = response.data.condition.description;
  city.innerHTML = `${response.data.city}`;
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", submitCity);

searchCity("Lisbon");
