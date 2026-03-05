import { dom } from "./variable.js";

const { hourlyGrid, dailyForecast, secondResult, firstResult } = dom;

export function loading() {
  clearSections();
  renderMainLoading();
  renderInfoSkeleton();
  renderDailySkeleton();
  renderHourlySkeleton();
  showLayout();
}

/* ---------------------- */
/* Utilities */
/* ---------------------- */

function clearSections() {
  firstResult.innerHTML = "";
  secondResult.innerHTML = "";
  dailyForecast.innerHTML = "";
  hourlyGrid.innerHTML = "";
}

function showLayout() {
  const flex = document.querySelector(".desktop-flex");
  if (flex) flex.classList.remove("flex-hidden");
}

/* ---------------------- */
/* Main Hero Loading */
/* ---------------------- */

function renderMainLoading() {
  const container = document.createElement("div");
  container.classList.add("loading-center");

  const dots = document.createElement("div");
  dots.classList.add("loading-dots");

  for (let i = 0; i < 3; i++) {
    const span = document.createElement("span");
    dots.appendChild(span);
  }

  const text = document.createElement("p");
  text.textContent = "Loading...";
  text.classList.add("loading-text");

  container.appendChild(dots);
  container.appendChild(text);
  firstResult.appendChild(container);
}

/* ---------------------- */
/* Info Grid Skeleton */
/* ---------------------- */

function renderInfoSkeleton() {
  const labels = ["Feels Like", "Humidity", "Wind", "Precipitation"];

  labels.forEach((label) => {
    const card = document.createElement("div");
    card.classList.add("grid1");

    const h2 = document.createElement("h2");
    h2.textContent = label;

    const value = document.createElement("p");
    value.textContent = "—";

    card.appendChild(h2);
    card.appendChild(value);
    secondResult.appendChild(card);
  });
}

/* ---------------------- */
/* Daily Forecast Skeleton */
/* ---------------------- */

function renderDailySkeleton() {
  for (let i = 0; i < 7; i++) {
    const card = document.createElement("div");
    card.classList.add("daily-forcast-grid", "skeleton");
    dailyForecast.appendChild(card);
  }
}

/* ---------------------- */
/* Hourly Forecast Skeleton */
/* ---------------------- */

function renderHourlySkeleton() {
  for (let i = 0; i < 7; i++) {
    const row = document.createElement("div");
    row.classList.add("hourly-result", "skeleton");
    hourlyGrid.appendChild(row);
  }
}

export function searchLoad() {
  const suggestion = document.querySelector(".search-suggestions");
  suggestion.innerHTML = "";

  suggestion.style.display = "block";
  const div = document.createElement("div");
  div.classList.add("spin");
  const img = document.createElement("img");
  img.src = `./images/icon-loading.svg`;
  img.height = `20`;
  img.width = `20`;
  const p = document.createElement("p");
  p.textContent = "search in progress";
  p.style.fontSize = "18px";

  suggestion.appendChild(div);
  div.appendChild(img);
  div.appendChild(p);
}
