import { dom } from "./variable.js";
import { weatherCode } from "./weathercode.js";
import { addFavorite, removeFavorite, getFavorites } from "./favorites.js";
const { hourlyGrid, dailyForecast, secondResult, firstResult } = dom;

const SVG_BOOKMARK_EMPTY = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;
const SVG_BOOKMARK_FILLED = `<svg width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

export function dailyBg(country, name, currentTime, temp, isDay) {
  function isDayCode(isDay) {
    if (isDay === 1) {
      return `./images/icon-sunny.webp`;
    } else {
      return `./images/moon.svg`;
    }
  }

  const div = document.createElement("div");
  div.classList.add("background-words");

  const p = document.createElement("p");
  p.classList.add("country");
  p.textContent = `${country}, ${name}`;

  const p1 = document.createElement("p");
  p1.classList.add("day");
  p1.textContent = `${currentTime}`;

  const div1 = document.createElement("div");
  div1.classList.add("background-icon");

  const img = document.createElement("img");
  img.src = `${isDayCode(isDay)}`;
  img.alt = "";
  img.width = 60;
  img.height = 60;
  img.classList.add = "surface-image";

  const p2 = document.createElement("p");
  p2.classList.add("background-temp");
  p2.textContent = `${temp}°`;

  firstResult.innerHTML = "";

  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.classList.add("bookmark-btn");

  const favs = getFavorites();
  const isSaved = favs.find((f) => f.name === name && f.country === country);
  bookmarkBtn.innerHTML = isSaved ? SVG_BOOKMARK_FILLED : SVG_BOOKMARK_EMPTY;

  bookmarkBtn.addEventListener("click", () => {
    const current = getFavorites();
    const already = current.find(
      (f) => f.name === name && f.country === country,
    );
    if (already) {
      removeFavorite(name, country);
      bookmarkBtn.innerHTML = SVG_BOOKMARK_EMPTY;
    } else {
      import("./state.js").then(({ getWeatherData }) => {
        const wd = getWeatherData();
        if (wd) addFavorite(wd.latitude, wd.longitude, country, name);
      });
      bookmarkBtn.innerHTML = SVG_BOOKMARK_FILLED;
    }
  });

  firstResult.appendChild(div);
  firstResult.appendChild(div1);
  div.appendChild(p);
  div.appendChild(p1);
  div1.appendChild(img);
  div1.appendChild(p2);
  firstResult.appendChild(bookmarkBtn);
}

export function feelsLIke(
  feelsLike,
  humidity,
  wind,
  prep,
  uvIndex,
  visibility,
  pressure,
) {
  secondResult.innerHTML = "";

  const helper = (label, value) => {
    const div = document.createElement("div");
    div.classList.add("grid1");
    const h2 = document.createElement("h2");
    h2.textContent = label;
    const p = document.createElement("p");
    p.textContent = value;
    div.appendChild(h2);
    div.appendChild(p);
    secondResult.appendChild(div);
  };

  helper("Feels like", feelsLike + "°");
  helper("Humidity", humidity + "%");
  helper("Wind", wind);
  helper("Precipitation", prep);
  if (uvIndex !== undefined) helper("UV Index", uvIndex);
  if (visibility !== undefined)
    helper("Visibility", Math.round(visibility / 1000) + " km");
  if (pressure !== undefined) helper("Pressure", Math.round(pressure) + " hPa");
}

export function dailyForcast(dailyTime, code, minTemp, maxTemp) {
  dailyForecast.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const div = document.createElement("div");
    div.classList.add("daily-forcast-grid");

    const h2 = document.createElement("h2");
    h2.textContent = new Date(dailyTime[i]).toLocaleDateString("en-us", {
      weekday: "short",
    });

    const img = document.createElement("img");
    img.src = ` ${weatherCode(code[i])} `;
    img.alt = "alt";
    img.height = 40;
    img.width = 40;

    const div1 = document.createElement("div");
    div1.classList.add("daily-forcast-temp");

    const p1 = document.createElement("p");
    p1.textContent = maxTemp[i] + "°";

    const p2 = document.createElement("p");
    p2.textContent = minTemp[i] + "°";

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(div1);
    div1.appendChild(p1);
    div1.appendChild(p2);
    dailyForecast.appendChild(div);
  }
}

export function hourlyForcast(code, hourlyTime, hourlyTemp) {
  hourlyGrid.innerHTML = "";
  let now = new Date();
  let startHour = hourlyTime.findIndex((hour) => new Date(hour) >= now);
  if (startHour === -1) startHour = 0;

  for (let i = 0; i < hourlyTime.length; i++) {
    const div = document.createElement("div");
    div.classList.add("hourly-result");

    const div1 = document.createElement("div");
    div1.classList.add("hourly-time-img");

    const img = document.createElement("img");
    img.src = `${weatherCode(code[i])}`;
    img.alt = `fog`;
    img.width = 40;
    img.height = 40;

    const p = document.createElement("p");
    p.textContent = new Date(hourlyTime[i]).toLocaleTimeString("us-en", {
      hour: "numeric",
      hour12: true,
    });

    const p1 = document.createElement("p");
    p1.textContent = hourlyTemp[i] + "°";

    div1.appendChild(img);
    div1.appendChild(p);
    div.appendChild(div1);
    div.appendChild(p1);
    hourlyGrid.appendChild(div);
  }
}

export function sunriseSunset(sunrise, sunset) {
  const container = document.querySelector(".sun-times");
  if (!container) return;
  container.innerHTML = "";

  const format = (iso) =>
    new Date(iso).toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const wrapper = document.createElement("div");
  wrapper.classList.add("sun-times-inner");

  const riseDiv = document.createElement("div");
  riseDiv.classList.add("sun-item");
  riseDiv.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f6a623" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M19.07 4.93l-1.41 1.41M22 12h-2"/>
      <path d="M5 17a7 7 0 0 1 14 0"/>
      <line x1="3" y1="20" x2="21" y2="20"/>
      <polyline points="8 17 12 13 16 17"/>
    </svg>
    <div>
      <p class="sun-label">Sunrise</p>
      <p class="sun-value">${format(sunrise[0])}</p>
    </div>
  `;

  const setDiv = document.createElement("div");
  setDiv.classList.add("sun-item");
  setDiv.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f6a623" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M19.07 4.93l-1.41 1.41M22 12h-2"/>
      <path d="M5 17a7 7 0 0 1 14 0"/>
      <line x1="3" y1="20" x2="21" y2="20"/>
      <polyline points="16 13 12 17 8 13"/>
    </svg>
    <div>
      <p class="sun-label">Sunset</p>
      <p class="sun-value">${format(sunset[0])}</p>
    </div>
  `;

  const now = new Date();
  const riseTime = new Date(sunrise[0]);
  const setTime = new Date(sunset[0]);
  const totalDay = setTime - riseTime;
  const elapsed = Math.min(Math.max(now - riseTime, 0), totalDay);
  const percent = Math.round((elapsed / totalDay) * 100);

  const bar = document.createElement("div");
  bar.classList.add("sun-progress-wrap");
  bar.innerHTML = `
    <div class="sun-progress-bar">
      <div class="sun-progress-fill" style="width:${percent}%"></div>
    </div>
  `;

  wrapper.appendChild(riseDiv);
  wrapper.appendChild(bar);
  wrapper.appendChild(setDiv);
  container.appendChild(wrapper);
}
