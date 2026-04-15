import { geo } from "./api.js";
import { searchLoad } from "./loadingState.js";

export function initVoiceSearch() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const micBtn = document.querySelector(".mic-btn");
  if (!micBtn) return;

  if (!SpeechRecognition) {
    micBtn.style.display = "none";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    micBtn.classList.add("mic-listening");
    recognition.start();
  });

  recognition.addEventListener("result", async (event) => {
    const spoken = event.results[0][0].transcript;
    const searchInput = document.querySelector(".search-input");
    searchInput.value = spoken;
    micBtn.classList.remove("mic-listening");
    searchLoad();
    await geo(spoken);
  });

  recognition.addEventListener("end", () => {
    micBtn.classList.remove("mic-listening");
  });

  recognition.addEventListener("error", (e) => {
    micBtn.classList.remove("mic-listening");
    console.warn("Voice recognition error:", e.error);
  });
}
