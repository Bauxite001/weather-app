import { dom } from "./variable.js";
import { dropDown1, dropdown2, higlighted } from "./dropdown.js";
import { geo } from "./api.js";
import { landingPage } from "./errorState.js";
import { searchLoad } from "./loadingState.js";
const form = document.getElementById("search-form");

landingPage();
const {
  unitDropDown,
  units,
  hourlyDay,
  selectedCont,
  selectedDay,
  secondDropDown,
  submitSearch,
  searchInput,
} = dom;
form.addEventListener("submit", async (e) => {
  e.stopPropagation();
  e.preventDefault();
  if (searchInput.value.trim()) {
    const city = searchInput.value;
    searchLoad();
    await geo(city);
    form.blur();
  } else {
    alert("please input  a valid location");
  }

  searchInput.value = "";
});
submitSearch.addEventListener("click", async (e) => {
  e.stopPropagation();
  if (searchInput.value.trim()) {
    const city = searchInput.value;
    searchLoad();
    await geo(city);
    form.blur();
  } else {
    alert("please input  a valid location");
  }

  searchInput.value = "";
});

dropDown1(unitDropDown, units);
dropDown1(selectedCont, hourlyDay);
dropdown2(hourlyDay);
higlighted(secondDropDown, selectedDay);
