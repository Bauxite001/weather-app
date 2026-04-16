const codeMap = {
  0: "sunny",
  1: "sunny",
  2: "partly-cloudy",
  3: "overcast",
  45: "fog",
  48: "fog",
  51: "drizzle",
  53: "drizzle",
  55: "drizzle",
  56: "drizzle",
  57: "drizzle",
  61: "rain",
  63: "rain",
  65: "rain",
  66: "rain",
  67: "rain",
  80: "rain",
  81: "rain",
  82: "rain",
  71: "snow",
  73: "snow",
  75: "snow",
  77: "snow",
  85: "snow",
  86: "snow",
  95: "storm",
  96: "storm",
  99: "storm",
};

const bodyBgMap = {
  sunny: "bg-sunny",
  "partly-cloudy": "bg-partly-cloudy",
  overcast: "bg-overcast",
  fog: "bg-fog",
  drizzle: "bg-drizzle",
  rain: "bg-rain",
  snow: "bg-snow",
  storm: "bg-storm",
};

export function animateBg(code, isDay) {
  const body = document.body;
  Object.values(bodyBgMap).forEach((cls) => body.classList.remove(cls));
  body.classList.remove("bg-night");
  const condition = codeMap[code] || "sunny";
  body.classList.add(isDay === 0 ? "bg-night" : bodyBgMap[condition]);
}
