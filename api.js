let weatherData;

export async function summoningJutsu(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=weather_code,temperature_2m,precipitation,apparent_temperature,relative_humidity_2m,wind_speed_10m,is_day`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    weatherData = data;

    console.log(weatherData);
    const {
      temperature_2m: currentTemp,
      is_day: isDay,
      precipitation: prep,
      apparent_temperature: feelsLike,
      weather_code: weatherCode,
      relative_humidity_2m: humidity,
      wind_speed_10m: wind,
      time: currentTime,
    } = weatherData.current;

    const {
      time: hourlyTime,
      temperature_2m: hourlyTemp,
      weather_code: hourlyWeatherCode,
    } = weatherData.hourly;

    const {
      time: dailyTime,
      weather_code: dailyWeatherCode,
      temperature_2m_max: maxTemp,
      temperature_2m_min: minTemp,
    } = weatherData.daily;

    return {
      currentTemp,
      isDay,
      prep,
      feelsLike,
      weatherCode,
      humidity,
      wind,
      currentTime,
      hourlyTime,
      hourlyTemp,
      hourlyWeatherCode,
      dailyWeatherCode,
      dailyTime,
      maxTemp,
      minTemp,
    };
  } catch (err) {
    console.error("error", err);
  }
}

export async function geo(city) {
  try {
    const location = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

    const response = await fetch(location);
    const data = await response.json();

    console.log(data);
    const { latitude: lat, longitude: lon, timezone, name } = data.results[0];
    return { lat, lon };
  } catch (error) {
    console.error(error);
  }
}
