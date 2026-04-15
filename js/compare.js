import { weatherCode } from "./weathercode.js";

const COMPARE_URL = (lat, lon) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature,uv_index&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

let compareList = [];

async function fetchCompareWeather(lat, lon, name, country) {
  const res = await fetch(COMPARE_URL(lat, lon));
  const data = await res.json();
  return { ...data, name, country };
}

function renderComparePanel() {
  const panel = document.querySelector(".compare-panel");
  panel.innerHTML = "";

  if (compareList.length === 0) {
    panel.innerHTML = `<p class="compare-empty">Search and add up to 3 locations to compare side by side.</p>`;
    return;
  }

  compareList.forEach((loc, i) => {
    const { name, country, current, daily } = loc;
    const card = document.createElement("div");
    card.classList.add("compare-card");

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("compare-remove");
    removeBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    removeBtn.addEventListener("click", () => {
      compareList.splice(i, 1);
      renderComparePanel();
    });

    const maxTemp = daily?.temperature_2m_max?.[0];
    const minTemp = daily?.temperature_2m_min?.[0];

    card.innerHTML = `
      <div class="compare-card-header">
        <p class="compare-city">${name}</p>
        <p class="compare-country">${country}</p>
      </div>
      <img src="${weatherCode(current.weather_code)}" width="56" height="56" alt="weather icon" class="compare-icon" />
      <p class="compare-temp">${Math.round(current.temperature_2m)}°</p>
      <div class="compare-minmax">
        <span class="compare-max">↑ ${Math.round(maxTemp)}°</span>
        <span class="compare-min">↓ ${Math.round(minTemp)}°</span>
      </div>
      <div class="compare-stats">
        <div class="compare-stat">
          <span class="compare-stat-label">Feels like</span>
          <span class="compare-stat-value">${Math.round(current.apparent_temperature)}°</span>
        </div>
        <div class="compare-stat">
          <span class="compare-stat-label">Humidity</span>
          <span class="compare-stat-value">${current.relative_humidity_2m}%</span>
        </div>
        <div class="compare-stat">
          <span class="compare-stat-label">Wind</span>
          <span class="compare-stat-value">${Math.round(current.wind_speed_10m)} km/h</span>
        </div>
        <div class="compare-stat">
          <span class="compare-stat-label">UV Index</span>
          <span class="compare-stat-value">${current.uv_index ?? "—"}</span>
        </div>
      </div>
    `;

    card.appendChild(removeBtn);
    panel.appendChild(card);
  });
}

function renderCompareSuggestions(results) {
  const box = document.querySelector(".compare-suggestions");
  box.innerHTML = "";
  if (!results || results.length === 0) {
    box.style.display = "block";
    box.innerHTML = `<div class="compare-suggestion-item" style="cursor:default;color:#ffffff60">No results found</div>`;
    return;
  }
  box.style.display = "block";
  results.forEach((place) => {
    const div = document.createElement("div");
    div.classList.add("compare-suggestion-item");
    div.textContent = `${place.name}, ${place.country}`;
    div.addEventListener("click", async () => {
      if (compareList.length >= 3) {
        alert("Maximum 3 locations for comparison.");
        return;
      }
      box.style.display = "none";
      const data = await fetchCompareWeather(
        place.latitude,
        place.longitude,
        place.name,
        place.country,
      );
      compareList.push(data);
      renderComparePanel();
    });
    box.appendChild(div);
  });
}

export function initCompare() {
  const trigger = document.querySelector(".compare-trigger");
  const modal = document.querySelector(".compare-modal");
  const closeBtn = document.querySelector(".compare-close");
  const searchInput = document.querySelector(".compare-search-input");
  const searchBtn = document.querySelector(".compare-search-btn");

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    modal.classList.toggle("compare-open");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("compare-open");
  });

  window.addEventListener("click", (e) => {
    if (!modal.contains(e.target) && !trigger.contains(e.target)) {
      modal.classList.remove("compare-open");
    }
  });

  async function runSearch() {
    const val = searchInput.value.trim();
    if (!val) return;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${val}&count=5&language=en&format=json`;
    const res = await fetch(url);
    const data = await res.json();
    renderCompareSuggestions(data.results);
  }

  searchBtn.addEventListener("click", runSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") runSearch();
  });

  renderComparePanel();
}
