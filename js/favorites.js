import { summoningJutsu } from "./api.js";
import { loading } from "./loadingState.js";

const STORAGE_KEY = "weather_favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveFavorites(favs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function addFavorite(lat, lon, country, name) {
  const favs = getFavorites();
  const exists = favs.find((f) => f.name === name && f.country === country);
  if (exists) return;
  favs.push({ lat, lon, country, name });
  saveFavorites(favs);
  renderFavorites();
}

export function removeFavorite(name, country) {
  const favs = getFavorites().filter(
    (f) => !(f.name === name && f.country === country),
  );
  saveFavorites(favs);
  renderFavorites();
}

export function renderFavorites() {
  const container = document.querySelector(".favorites-list");
  if (!container) return;
  const favs = getFavorites();
  container.innerHTML = "";

  if (favs.length === 0) {
    container.innerHTML = `<p class="no-favs">No saved locations yet.</p>`;
    return;
  }

  favs.forEach((fav) => {
    const item = document.createElement("div");
    item.classList.add("fav-item");

    const label = document.createElement("span");
    label.textContent = `${fav.name}, ${fav.country}`;
    label.classList.add("fav-label");
    label.addEventListener("click", () => {
      loading();
      summoningJutsu(fav.lat, fav.lon, fav.country, fav.name);
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("fav-remove");
    removeBtn.setAttribute("aria-label", "Remove");
    removeBtn.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    `;
    removeBtn.addEventListener("click", () =>
      removeFavorite(fav.name, fav.country),
    );

    item.appendChild(label);
    item.appendChild(removeBtn);
    container.appendChild(item);
  });
}
