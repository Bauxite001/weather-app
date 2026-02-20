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
  days.forEach((day) => {
    day.addEventListener("click", () => {
      selected.textContent = day.textContent;

      days.forEach((d) => {
        d.classList.remove("highlighted");
      });
      day.classList.add("highlighted");
    });
  });
}
