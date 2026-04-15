import { summoningJutsu } from "./api.js";
import { loading } from "./loadingState.js";

export async function pos() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        loading();
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=&latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        );
        const data = await res.json();
        const city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.county ||
          "Unknown";
        const country = data.address.country || "";
        await summoningJutsu(latitude, longitude, country, city);
      } catch (err) {
        console.error("Reverse geocode failed:", err);
      }
    },
    (err) => {
      console.warn("Geolocation denied or unavailable:", err.message);
    },
  );
}
