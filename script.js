const loginScreen = document.getElementById("login-screen");
const gameScreen = document.getElementById("game-screen");
const loginBtn = document.getElementById("login-btn");
const guestBtn = document.getElementById("guest-btn");
const usernameInput = document.getElementById("username");
const welcome = document.getElementById("welcome");
const board = document.getElementById("board");
const muteBtn = document.getElementById("mute-btn");
const resetBtn = document.getElementById("reset-btn");
const ding = document.getElementById("ding");

let muted = false;
let micStream;

// iniciar sesión
function login(name) {
  loginScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  welcome.textContent = `Hola, ${name}! Eres el locutor 🎙️`;
  initBoard();
  startMic();
}

loginBtn.onclick = () => {
  const name = usernameInput.value.trim() || "Jugador";
  login(name);
};
guestBtn.onclick = () => login("Invitado");

// crear tablero 1–75
function initBoard() {
  board.innerHTML = "";
  for (let i = 1; i <= 75; i++) {
    const cell = document.createElement("div");
    cell.className = "number";
    cell.textContent = i;
    cell.onclick = () => pickNumber(cell, i);
    board.appendChild(cell);
  }
}

// elegir número
function pickNumber(cell, num) {
  if (cell.classList.contains("clicked")) return;
  cell.classList.add("clicked");
  if (!muted) ding.play();
  alert(`🎙️ Número ${num}!`);
}

// micrófono
async function startMic() {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (e) {
    console.warn("No se pudo activar el micrófono.");
  }
}

muteBtn.onclick = () => {
  muted = !muted;
  if (micStream) {
    micStream.getAudioTracks().forEach(t => t.enabled = !muted);
  }
  muteBtn.textContent = muted ? "🔊 Activar micrófono" : "🔇 Silenciar micrófono";
};

// reiniciar
resetBtn.onclick = initBoard;
