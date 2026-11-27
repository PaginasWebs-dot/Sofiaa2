const CLAVE = "10102020";           // fecha del primer beso (solo dígitos)
const INICIO = [2020, 9, 10];       // 10/10/2020 (el mes cuenta desde 0)

const gate = document.getElementById("gate");
const main = document.getElementById("main");
const clave = document.getElementById("clave");
const err = document.getElementById("err");

function entrar() {
  const digitos = clave.value.replace(/\D/g, "");
  if (digitos === CLAVE) {
    gate.hidden = true;
    main.hidden = false;
    window.scrollTo(0, 0);
    contarDias();
    confeti();
  } else {
    err.textContent = "Esa no es. Piensa en la fecha en que empezó todo.";
  }
}
document.getElementById("entrar").addEventListener("click", entrar);
clave.addEventListener("keydown", e => { if (e.key === "Enter") entrar(); });

function contarDias() {
  const hoy = new Date();
  const a = Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const b = Date.UTC(INICIO[0], INICIO[1], INICIO[2]);
  document.getElementById("dias").textContent =
    Math.floor((a - b) / 864e5).toLocaleString("es-CL");
}

function confeti() {
  const emojis = ["🎉", "💖", "🍕", "✨", "🎂"];
  for (let i = 0; i < 36; i++) {
    const s = document.createElement("span");
    s.className = "confeti";
    s.textContent = emojis[i % emojis.length];
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = 3 + Math.random() * 3 + "s";
    s.style.animationDelay = Math.random() * 1.5 + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 8000);
  }
}

// Si una foto no existe todavía, muestra un aviso con el nombre que debe tener
document.querySelectorAll(".ph img").forEach(img => {
  img.addEventListener("error", () => {
    const caja = img.parentElement;
    caja.classList.add("vacio");
    caja.textContent = "Falta la foto: " + img.getAttribute("src");
  });
});

document.getElementById("canjear").addEventListener("click", e => {
  e.target.closest(".cupon").classList.add("listo");
  e.target.textContent = "¡Canjeado! Avísame cuándo vamos";
  e.target.disabled = true;
});

document.getElementById("corazon").addEventListener("click", () => {
  document.getElementById("secreto").hidden = false;
});
