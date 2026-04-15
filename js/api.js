import { renderWeather, setWeatherData } from "./state.js";
import { errorState } from "./errorState.js";
import { loading } from "./loadingState.js";
const flex = document.querySelector(".desktop-flex");

let weatherData;

// Fetch weather
export async function summoningJutsu(lat, lon, country, name) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m,weather_code&current=weather_code,temperature_2m,precipitation,apparent_temperature,relative_humidity_2m,wind_speed_10m,is_day,uv_index,visibility,surface_pressure`;

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
