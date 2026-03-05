import { hourlyForcast, dailyForcast, feelsLIke, dailyBg } from "./contents.js";
import { dom } from "./variable.js";
const switchB = document.querySelector(".unit-button");
let unit = "metric";
let weatherData;
const { tempCels, tempFah, speedKm, speedM, precipInch, precipMil } = dom;
export function setWeatherData(data) {
  weatherData = data;
}
export function getWeatherData() {
  return weatherData;
}

console.log(weatherData);

export function renderWeather() {
  if (!weatherData) return;
  const { city, name } = weatherData;

  // /*///////////
  // lets get the destructuring started
  // /*///////////

  const {
    time: currentTime,
    temperature_2m: currentTemp,
    weather_code: currentCode,
    is_day: isDay,
    precipitation: prep,
    apparent_temperature: appTemp,
    wind_speed_10m: wind,
    relative_humidity_2m: humidity,
  } = weatherData.current;

  const {
    time: dailyTime,
    weather_code: dailyWeatherCode,
    temperature_2m_max: maxTemp,
    temperature_2m_min: minTemp,
  } = weatherData.daily;
  const {
    time: hourlyTime,
    weather_code: hourlyWeatherCode,
    temperature_2m: hourlyTemp,
  } = weatherData.hourly;

  // /*///////////
  // lets get the conveersion started
  // /*///////////

  function convertTemp(temp) {
    return unit === "metric" ? temp : ((temp * 9) / 5 + 32).toFixed(1);
  }

  function convertWind(speed) {
    return unit === "metric" ? speed : (speed * 0.621371).toFixed(1);
  }

  function convertPrecip(precip) {
    return unit === "metric" ? precip : (precip * 0.0393701).toFixed(1);
  }

  // /*///////////
  // lets get the invoking started
  // /*///////////

  dailyBg(
    city,
    name,
    new Date(currentTime).toLocaleDateString("en-us", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    convertTemp(currentTemp),
    currentCode,
    isDay,
  );
  feelsLIke(
    convertTemp(appTemp),
    humidity,
    convertWind(wind),
    convertPrecip(prep),
  );
  dailyForcast(
    dailyTime,
    dailyWeatherCode,
    maxTemp.map(convertTemp),
    minTemp.map(convertTemp),
  );
  hourlyForcast(hourlyWeatherCode, hourlyTime, hourlyTemp.map(convertTemp));
}

function switchFunc() {
  const temps = [tempCels, tempFah];
  const speed = [speedKm, speedM];
  const precip = [precipMil, precipInch];
  unit = unit === "metric" ? "imperial" : "metric";
  if (unit === "metric") {
    switchB.textContent = "Switch to Imperial";
    [...temps, ...speed, ...precip].forEach((all) => {
      all.classList.remove("spanJs");
    });

    tempCels.classList.add("spanJs");
    speedKm.classList.add("spanJs");
    precipMil.classList.add("spanJs");
  } else {
    switchB.textContent = "Switch to metric";
    [...temps, ...speed, ...precip].forEach((temp) => {
      temp.classList.remove("spanJs");
    });
    tempFah.classList.add("spanJs");
    speedM.classList.add("spanJs");
    precipInch.classList.add("spanJs");
  }
  renderWeather();
}

switchB.addEventListener("click", switchFunc);
