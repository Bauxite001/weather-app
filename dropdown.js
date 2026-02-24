import { getWeatherData } from "./state.js";
import { hourlyForcast } from "./contents.js";

export function dropDown1(trigger, target) {
  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    target.classList.toggle("make-visible");
  });

  window.addEventListener("click", () => {
    target.classList.remove("make-visible");
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

// // Unit groups
// const tempItems = document.querySelectorAll(".temp-cels, .temp-fah");
// const windItems = document.querySelectorAll(".speed-km, .speed-m");
// const precipItems = document.querySelectorAll(".precip-mil, .precip-inch");

// // Handle individual clicks (single select)
// [tempItems, windItems, precipItems].forEach((group) => {
//   group.forEach((item) => {
//     item.addEventListener("click", () => {
//       group.forEach((i) => (i.querySelector("span").style.opacity = "0"));
//       item.querySelector("span").style.opacity = "1";
//     });
//   });
// });

// // Switch to Imperial button
// const imperialBtn = document.querySelector(".unit-button");
// let imperialActive = false;

// imperialBtn.addEventListener("click", () => {
//   imperialActive = !imperialActive;

//   if (imperialActive) {
//     // Imperial units
//     tempItems.forEach(
//       (i) =>
//         (i.querySelector("span").style.opacity = i.classList.contains(
//           "temp-fah",
//         )
//           ? "1"
//           : "0"),
//     );
//     windItems.forEach(
//       (i) =>
//         (i.querySelector("span").style.opacity = i.classList.contains("speed-m")
//           ? "1"
//           : "0"),
//     );
//     precipItems.forEach(
//       (i) =>
//         (i.querySelector("span").style.opacity = i.classList.contains(
//           "precip-inch",
//         )
//           ? "1"
//           : "0"),
//     );
//     imperialBtn.textContent = "Switch to Metric";
//   } else {
//     // Metric units
//     tempItems.forEach(
//       (i) =>
//         (i.querySelector("span").style.opacity = i.classList.contains(
//           "temp-cels",
//         )
//           ? "1"
//           : "0"),
//     );
//     windItems.forEach(
//       (i) =>
//         (i.querySelector("span").style.opacity = i.classList.contains(
//           "speed-km",
//         )
//           ? "1"
//           : "0"),
//     );
//     precipItems.forEach(
//       (i) =>
//         (i.querySelector("span").style.opacity = i.classList.contains(
//           "precip-mil",
//         )
//           ? "1"
//           : "0"),
//     );
//     imperialBtn.textContent = "Switch to Imperial";
//   }
// });
