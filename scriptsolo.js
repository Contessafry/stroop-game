const colori = [
  "verde",
  "blu",
  "rosso",
  "giallo",
  "viola",
  "fuchsia",
  "arancione",
];
const tasti = [
  document.getElementById("tastoverde"),
  document.getElementById("tastoblu"),
  document.getElementById("tastorosso"),
  document.getElementById("tastogiallo"),
  document.getElementById("tastoviola"),
  document.getElementById("tastorosa"),
  document.getElementById("tastoarancione"),
];

let score = 0;
let timer = 5; // Tempo in secondi
let timerElement = document.getElementById("timer");
let scoreElement = document.getElementById("score");

function assegnaOpzioni() {
  // Scegli casualmente un indice corretto
  const indiceCorretto = Math.floor(Math.random() * tasti.length);

  // Assegna la classe corretta a un tasto
  const tastoCorretto = tasti[indiceCorretto];
  assegnaClasseCasuale(tastoCorretto, colori[indiceCorretto]);

  // Assegna classi casuali agli altri tasti
  for (let i = 0; i < tasti.length; i++) {
    if (i !== indiceCorretto) {
      assegnaClasseCasuale(
        tasti[i],
        colori[Math.floor(Math.random() * colori.length)]
      );
    }
  }
}

function assegnaClasseCasuale(tasto, classe) {
  tasto.classList = "";
  tasto.classList.add("game-button", classe);
}

function handleButtonClick(tasto, indice) {
  const coloreCliccato = tasto.classList[1]; // Ottieni la classe del colore del tasto cliccato
  const coloreAtteso = colori[indice]; // Ottieni il colore atteso

  if (coloreCliccato === coloreAtteso) {
    // Incrementa il punteggio se il colore è corretto
    score++;
  } else {
    // Altrimenti, decrementa il punteggio
    score = Math.max(0, score - 1);
  }

  // Aggiorna il punteggio nell'elemento HTML
  scoreElement.textContent = `Score: ${score}`;

  // Assegna nuove opzioni e reimposta il timer
  assegnaOpzioni();
  resetTimer();
  spostaTastiCasualmente();
  changeBackgroundColor();
}

function updateTimer() {
  timer--;

  if (timer < 0) {
    // Se il timer scade, decrementa il punteggio e assegna nuove opzioni
    timer = 5; // Reimposta il timer
    score = Math.max(0, score - 1);
    scoreElement.textContent = `Score: ${score}`;
    assegnaOpzioni();
    spostaTastiCasualmente();
    changeBackgroundColor();
  }

  // Aggiorna il timer nell'elemento HTML
  timerElement.textContent = `Timer: ${timer}`;
}

function resetTimer() {
  // Reimposta il timer a 5 secondi
  timer = 5;
  // Aggiorna il timer nell'elemento HTML
  timerElement.textContent = `Timer: ${timer}`;
}

// Assegna opzioni iniziali al caricamento della pagina
assegnaOpzioni();

// Aggiungi un listener di click a ciascun tasto
for (let i = 0; i < tasti.length; i++) {
  tasti[i].addEventListener("click", function () {
    handleButtonClick(this, i);
  });
}
function spostaTastiCasualmente() {
  for (let i = 0; i < tasti.length; i++) {
    const posizioneCasualeX = Math.floor(
      Math.random() * (window.innerWidth - tasti[i].offsetWidth)
    );
    const posizioneCasualeY = Math.floor(
      Math.random() * (window.innerHeight - tasti[i].offsetHeight)
    );

    tasti[i].style.position = "absolute";
    tasti[i].style.top = `${posizioneCasualeY}px`;
    tasti[i].style.left = `${posizioneCasualeX}px`;
  }
}
function generateRandomColorsBody() {
  const numColors = 5; // Numero di colori nel gradiente
  const randomColors = [];

  for (let i = 0; i < numColors; i++) {
    const randomColor = getRandomColor();
    randomColors.push(randomColor);
  }

  return randomColors;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function generateGradient(colors) {
  return `radial-gradient(circle, ${colors.join(", ")})`;
}

function changeBackgroundColor() {
  const body = document.body;
  const colors = generateRandomColorsBody();
  const gradient = generateGradient(colors);
  body.style.background = gradient;
}

// Chiamare la funzione per cambiare il colore quando necessario
changeBackgroundColor();

// Il resto del tuo codice...

// Aggiorna il timer ogni secondo
setInterval(updateTimer, 1000);
