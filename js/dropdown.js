import { getWeatherData } from "./state.js";
import { hourlyForcast } from "./contents.js";
const suggestion = document.querySelector(".search-suggestions");
export function dropDown1(trigger, target) {
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    target.classList.toggle("make-visible");
  });

  window.addEventListener("click", () => {
    target.classList.remove("make-visible");
    suggestion.style.display = "none";
  });

  target.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

export function dropdown2(target) {
  target.addEventListener("click", () => {
    target.classList.remove("make-visible");
  });
}

export function higlighted(days, selected) {
  selected.textContent = new Date().toLocaleDateString("en-us", {
    weekday: "long",
  });
  days.forEach((day) => {
    day.addEventListener("click", () => {
      selected.textContent = day.textContent;

      // INDEXING //
      const day1 = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      const today = new Date().toLocaleString("us-en", { weekday: "long" });
      const clickedDay = day1.indexOf(day.textContent);
      const todayIndex = day1.indexOf(today);
      let difference = clickedDay - todayIndex;

      if (difference < 0) {
        difference += 7;
      }
      const startIndex = difference * 24;
      const endIndex = startIndex + 24;

      days.forEach((d) => {
        d.classList.remove("highlighted");
      });
      day.classList.add("highlighted");

      const data = getWeatherData();

      if (!data) return;

      const {
        time,
        temperature_2m: temp,
        weather_code: weatherCode,
      } = data.hourly;

      const slicedTime = time.slice(startIndex, endIndex);
      const slicedTemp = temp.slice(startIndex, endIndex);
      const slicedCode = weatherCode.slice(startIndex, endIndex);

      hourlyForcast(slicedCode, slicedTime, slicedTemp);
    });
  });
}
