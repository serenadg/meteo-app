function submitCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".search-input");

  let cityName = cityInput.value;
  searchCity(cityName);
}

function searchCity(cityName) {
  let apiKey = "a0aca8t7806acb2cb338fb20fbc444o1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getForecast(cityName) {
  let apiKey = "a0aca8t7806acb2cb338fb20fbc444o1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let temperature = document.querySelector(".temperatureValue");
  let weatherDesc = document.querySelector(".weather-desc");
  let city = document.querySelector(".city");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date1 = new Date(response.data.time * 1000);
  let dateElement = document.querySelector(".date");
  let iconImage = document.querySelector(".emoji");
  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" class=emoji />`;
  temperature.innerHTML = `${Math.round(response.data.temperature.current)}`;
  weatherDesc.innerHTML = response.data.condition.description;
  city.innerHTML = `${response.data.city}`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  wind.innerHTML = `${response.data.wind.speed}km/h`;
  dateElement.innerHTML = formatDate(date1);
  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

let form = document.querySelector(".search-form");
form.addEventListener("submit", submitCity);

searchCity("Lisbon");

function friendlyDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response);
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="column">
            <div class="forecast-preview">
              <div class="forecast-day">${friendlyDate(day.time)}</div>
              <div class="forecast-icon"><img src="${day.condition.icon_url}"/></div>
              <div class="forecast-temp">
                <span class="temp-max"><strong>${Math.round(day.temperature.maximum)}°</strong></span>
                <span class="temp-min">${Math.round(day.temperature.minimum)}°</span>
              </div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector(".forecast-row");
  forecastElement.innerHTML = forecastHTML;
}
