const THEME_KEY = "weather_theme";

function getAutoTheme() {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 19 ? "light" : "dark";
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
}

export function initTheme() {
  applyTheme(getAutoTheme());

  // Re-check every minute in case the hour changes
  setInterval(() => {
    applyTheme(getAutoTheme());
  }, 60000);
}
