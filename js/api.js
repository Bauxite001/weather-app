import { renderWeather, setWeatherData } from "./state.js";
import { errorState } from "./errorState.js";
import { loading } from "../loadingState.js";
const flex = document.querySelector(".desktop-flex");

let weatherData;

// // Current unit selections
// let units = {
//   temperature: "C", // "C" or "F"
//   wind: "kmh", // "kmh" or "mph"
//   precipitation: "mm", // "mm" or "in"
// };

// // Conversion helpers
// function convertTemperature(value) {
//   return units.temperature === "C" ? value : (value * 9) / 5 + 32;
// }

// function convertWind(value) {
//   return units.wind === "kmh" ? value : value / 1.609;
// }

// function convertPrecipitation(value) {
//   return units.precipitation === "mm" ? value : value / 25.4;
// }

// // Update units UI
// export function setupUnitSwitch() {
//   const tempEls = document.querySelectorAll(".temp-cels, .temp-fah");
//   const windEls = document.querySelectorAll(".speed-km, .speed-m");
//   const precEls = document.querySelectorAll(".precip-mil, .precip-inch");

//   function selectOne(group, selectedValue) {
//     group.forEach((el) => (el.querySelector("span").style.opacity = "0")); // clear all
//     const selectedEl = Array.from(group).find((el) =>
//       el.textContent.includes(selectedValue),
//     );
//     if (selectedEl) selectedEl.querySelector("span").style.opacity = "1";
//   }

//   tempEls.forEach((el) => {
//     el.addEventListener("click", () => {
//       units.temperature = el.textContent.includes("Celsius") ? "C" : "F";
//       selectOne(tempEls, units.temperature === "C" ? "Celsius" : "Fahrenheit");
//       if (weatherData) renderWeather();
//     });
//   });

//   windEls.forEach((el) => {
//     el.addEventListener("click", () => {
//       units.wind = el.textContent.includes("Km") ? "kmh" : "mph";
//       selectOne(windEls, units.wind === "kmh" ? "Km" : "mph");
//       if (weatherData) renderWeather();
//     });
//   });

//   precEls.forEach((el) => {
//     el.addEventListener("click", () => {
//       units.precipitation = el.textContent.includes("Millimeters")
//         ? "mm"
//         : "in";
//       selectOne(
//         precEls,
//         units.precipitation === "mm" ? "Millimeters" : "Inches",
//       );
//       if (weatherData) renderWeather();
//     });
//   });
// }

// // Render function with unit conversions
// function renderWeather() {
//   const current = weatherData.current;
//   const daily = weatherData.daily;
//   const hourly = weatherData.hourly;

//   // Convert current
//   const currentTemp = convertTemperature(current.temperature_2m);
//   const wind = convertWind(current.wind_speed_10m);
//   const prep = convertPrecipitation(current.precipitation);
//   const feelsLike = convertTemperature(current.apparent_temperature);

//   // Daily conversion
//   const maxTemp = daily.temperature_2m_max.map(convertTemperature);
//   const minTemp = daily.temperature_2m_min.map(convertTemperature);

//   // Hourly conversion
//   const hourlyTemp = hourly.temperature_2m.map(convertTemperature);

//   const todayHours = hourly.time.slice(0, 24);
//   const todayCode = hourly.weather_code.slice(0, 24);

//   hourlyForcast(todayCode, todayHours, hourlyTemp);

//   const today = new Date();
//   const option = {
//     weekday: "long",
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   };
//   dailyBg(
//     weatherData.city,
//     weatherData.name,
//     today.toLocaleDateString("en-us", option),
//     currentTemp,
//     current.is_day,
//     current.weather_code,
//   );
//   feelsLIke(feelsLike, current.relative_humidity_2m, wind, prep);
//   dailyForcast(daily.time, daily.weather_code, minTemp, maxTemp);
// }

// Fetch weather
export async function summoningJutsu(lat, lon, country, name) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=weather_code,temperature_2m,precipitation,apparent_temperature,relative_humidity_2m,wind_speed_10m,is_day`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    weatherData = { ...data, city: country, name };
    setWeatherData(weatherData);
    flex.classList.remove("flex-hidden");
    renderWeather();
  } catch (err) {
    errorState();
    console.error("Error fetching weather:", err);
  }
}

// Geo lookup
export async function geo(city) {
  try {
    const location = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=en&format=json`;
    const response = await fetch(location);
    const data = await response.json();
    console.log(data);

    const suggestion = document.querySelector(".search-suggestions");
    suggestion.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      suggestion.style.display = "block";
      const div = document.createElement("div");
      div.classList.add("suggestion-item");
      div.textContent = "No search result found";
      div.style.cursor = "default";
      suggestion.appendChild(div);
      return;
    }

    suggestion.style.display = "block"; // show suggestions

    data.results.forEach((place) => {
      const div = document.createElement("div");
      div.classList.add("suggestion-item");
      div.textContent = `${place.name}, ${place.country}`;
      suggestion.appendChild(div);

      div.addEventListener("click", () => {
        loading();
        summoningJutsu(
          place.latitude,
          place.longitude,
          place.country,
          place.name,
        );
        console.log("clicked");

        suggestion.innerHTML = "";
        suggestion.style.display = "none";
      });
    });
  } catch (error) {
    errorState();
    console.error("Geo error:", error);
  }
}
