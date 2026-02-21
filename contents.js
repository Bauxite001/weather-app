import { dom } from "./variable.js";
const { hourlyGrid, dailyForecast, secondResult, firstResult } = dom;
export function dailyBg(country, name, currentTime, temp) {
  const div = document.createElement("div");
  div.classList.add("background-words");
  const p = document.createElement("p");
  p.classList.add("country");
  p.textContent = `${country}, ${name}`;
  const p1 = document.createElement("p1");
  p1.classList.add("day");
  p1.textContent = `${currentTime}`;

  const div1 = document.createElement("div");
  div1.classList.add("background-icon");
  const img = document.createElement("img");
  img.src = "./images/icon-rain.webp";
  img.alt = "";
  img.width = 60;
  img.height = 60;
  img.classList.add = "surface-image";

  const p2 = document.createElement("p");
  p2.classList.add("background-temp");
  p2.textContent = `${temp}°`;
  firstResult.innerHTML = "";
  firstResult.appendChild(div);
  firstResult.appendChild(div1);
  div.appendChild(p);
  div.appendChild(p1);
  div1.appendChild(img);
  div1.appendChild(p2);
}

export function feelsLIke(feelsLike, humidity, wind, prep) {
  secondResult.innerHTML = "";
  const helper = (what, help) => {
    const div = document.createElement("div");
    div.classList.add("grid1");
    const h2 = document.createElement("h2");
    h2.textContent = what;
    const p = document.createElement("p");
    p.textContent = help;
    secondResult.appendChild(div);
    div.appendChild(h2);
    div.appendChild(p);
  };

  helper("Feels like", feelsLike + "°");
  helper("Humidity", humidity);
  helper("Wind", wind);
  helper("Precipitation", prep);
}

export function dailyForcast(dailyTime, weatherCode, minTemp, maxTemp) {
  dailyForecast.innerHTML = "";
  for (let i = 0; i < 7; i++) {
    const div = document.createElement("div");
    div.classList.add("daily-forcast-grid");
    const h2 = document.createElement("h2");
    h2.textContent = new Date(dailyTime[i]).toLocaleDateString("en-us", {
      weekday: "short",
    });
    const img = document.createElement("img");
    img.src = `./images/icon-overcast.webp`;
    img.alt = "alt";
    img.height = 40;
    img.width = 40;
    const div1 = document.createElement("div");
    div1.classList.add("daily-forcast-temp");
    const p1 = document.createElement("p");
    p1.textContent = maxTemp[i] + "°";
    const p2 = document.createElement("p");
    p2.textContent = minTemp[i] + "°";

    dailyForecast.appendChild(div);
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(div1);
    div1.appendChild(p1);
    div1.appendChild(p2);
  }
}

export function hourlyForcast(hourlyWeatherCode, hourlyTime, hourlyTemp) {
  hourlyGrid.innerHTML = "";
  let now = new Date();
  let startHour = hourlyTime.findIndex((hour) => {
    return new Date(hour) >= now;
  });
  for (let i = startHour; i < startHour + 8; i++) {
    const div = document.createElement("div");
    div.classList.add("hourly-result");
    const div1 = document.createElement("div");
    div1.classList.add("hourly-time-img");
    const img = document.createElement("img");
    img.src = `./images/icon-storm.webp`;
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

    hourlyGrid.appendChild(div);
    div.appendChild(div1);
    div1.appendChild(img);
    div1.appendChild(p);
    div.appendChild(p1);
  }
}
