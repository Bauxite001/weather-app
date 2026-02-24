const weatherMap = {
  sunny: [0, 1],
  partlyCloudy: [2],
  overcast: [3],
  fog: [45, 48],
  drizzle: [51, 53, 55, 56, 57],
  rain: [61, 63, 65, 66, 67, 80, 81, 82],
  snow: [71, 73, 75, 77, 85, 86],
};

export function weatherCode(code) {
  for (let key in weatherMap) {
    if (weatherMap[key].includes(code)) {
      return `./images/icon-${key}.webp`;
    }
  }
  return "./images/icon-storm.webp";
}
