export function errorState() {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const div = document.createElement("div");
  const img = document.createElement("img");
  const img1 = document.createElement("img");
  const h1 = document.createElement("h1");
  const p = document.createElement("p");
  const p1 = document.createElement("p");
  const button = document.createElement("button");

  main.classList.add("new-error");
  div.classList.add("new-error");
  img.src = "./images/icon-error.svg";
  img.height = 40;
  img.width = 40;
  img.alt = "error";
  h1.textContent = "Something went wrong";
  p.textContent = `we could'nt connect to the server (API error), please try again in a few moments`;
  p.style.textAlign = "center";
  button.classList.add("retry");
  img1.src = "./images/icon-retry.svg";
  img1.height = 20;
  img1.width = 20;
  img1.alt = "retry";
  p1.textContent = "Retry";

  button.addEventListener("click", () => {
    location.reload();
  });

  main.appendChild(div);
  div.appendChild(img);
  div.appendChild(h1);
  div.appendChild(p);
  div.appendChild(button);
  button.appendChild(img1);
  button.appendChild(p1);
}

export function landingPage() {
  const flex = document.querySelector(".desktop-flex");
  flex.classList.add("flex-hidden");
}
