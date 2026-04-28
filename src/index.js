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

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="column">
            <div class="forecast-preview">
              <div class="forecast-day">${day}</div>
              <div class="forecast-icon">😢</div>
              <div class="forecast-temp">
                <span class="temp-max"><strong>25</strong></span>
                <span class="temp-min">16</span>
              </div>
            </div>
          </div>`;
  });

  let forecastElement = document.querySelector(".forecast-row");
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
