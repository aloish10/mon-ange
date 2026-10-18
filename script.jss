const SECRET_CODE = "111026";

const gate = document.getElementById("gate");
const site = document.getElementById("love-site");
const form = document.getElementById("code-form");
const codeInput = document.getElementById("secret-code");
const codeError = document.getElementById("code-error");
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (codeInput.value.trim() === SECRET_CODE) {
    gate.classList.add("hidden");
    site.classList.remove("hidden");
    codeError.textContent = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    startFloatingHearts();
  } else {
    codeError.textContent = "Ce n’est pas le bon code, mon ange. Réessaie 💗";
    codeInput.value = "";
    codeInput.focus();
  }
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.textContent = "♫ Couper la musique";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch {
      musicToggle.textContent = "Ajoute assets/musique.mp3";
    }
  } else {
    music.pause();
    musicToggle.textContent = "♫ Lancer la musique";
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

const sweetMessages = [
  "Tu es une de mes plus jolies pensées de la journée. ♡",
  "J’ai hâte de créer encore plein de souvenirs avec toi.",
  "Tu n’as pas besoin d’être parfaite pour être précieuse à mes yeux.",
  "Même un petit message de toi peut illuminer ma journée. ✨",
  "Aujourd’hui, demain, et dans tous nos petits moments : merci d’être toi.",
  "Si cette page te fait sourire, alors ma mission est réussie. 💗"
];
let lastMessage = -1;
document.getElementById("sweet-button").addEventListener("click", () => {
  let index = Math.floor(Math.random() * sweetMessages.length);
  if (sweetMessages.length > 1 && index === lastMessage) index = (index + 1) % sweetMessages.length;
  lastMessage = index;
  document.getElementById("sweet-message").textContent = sweetMessages[index];
});

document.querySelectorAll(".photo-input").forEach((input) => {
  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const preview = document.getElementById(input.dataset.target);
    const reader = new FileReader();
    reader.onload = () => { preview.src = reader.result; };
    reader.readAsDataURL(file);
  });
});

function startFloatingHearts() {
  const layer = document.querySelector(".floating-hearts");
  const symbols = ["♡", "♥", "✧"];
  setInterval(() => {
    if (document.hidden || site.classList.contains("hidden")) return;
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 96}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${6 + Math.random() * 5}s`;
    layer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove(), { once: true });
  }, 1300);
}

