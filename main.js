import { dom } from "./variable.js";
import { dropDown1, dropdown2, higlighted } from "./dropdown.js";
import { geo } from "./api.js";

const {
  unitDropDown,
  unitButton,
  units,
  hourlyDay,
  selectedCont,
  selectedDay,
  secondDropDown,
  submitSearch,
  searchInput,
} = dom;
submitSearch.addEventListener("click", async () => {
  console.log(dom.searchInput.value);

  const city = searchInput.value;
  await geo(city);
  searchInput.value = "";
});

dropDown1(unitDropDown, units);
dropDown1(selectedCont, hourlyDay);
dropdown2(hourlyDay);
higlighted(secondDropDown, selectedDay);
