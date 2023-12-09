// Array contenente i colori disponibili nel gioco
const colors = ["green", "orange", "red", "blue", "yellow", "purple", "gray"];

// Variabili di stato per il punteggio e il timer
let score = 0;
let timer = 10;

// Funzione per ottenere un colore casuale dall'array
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Funzione per mescolare un array (utilizzata per mescolare i colori)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Funzione per aggiornare i pulsanti del gioco
function updateButtons() {
  // Mescola l'array dei colori
  shuffleArray(colors);

  // Ottieni il contenitore dei pulsanti dal DOM
  const buttonsContainer = document.getElementById("buttons-container");
  // Cancella il contenuto del contenitore
  buttonsContainer.innerHTML = "";

  // Indice del colore corretto (quello da indovinare)
  const correctColorIndex = Math.floor(Math.random() * colors.length);
  // Colore corretto
  const correctColor = colors[correctColorIndex];

  // Itera attraverso tutti i colori per creare i pulsanti
  for (let i = 0; i < colors.length; i++) {
    // Crea un nuovo elemento pulsante
    const button = document.createElement("button");
    // Imposta il testo del pulsante con il colore corrente
    button.textContent = colors[i];
    // Imposta il colore di sfondo del pulsante
    button.style.backgroundColor =
      i === correctColorIndex ? correctColor : getRandomColor();
    // Assegna la classe "game-button" al pulsante
    button.className = "game-button";
    // Aggiungi un gestore di eventi per il clic sul pulsante
    button.addEventListener("click", () =>
      handleButtonClick(i === correctColorIndex)
    );
    // Aggiungi il pulsante al contenitore
    buttonsContainer.appendChild(button);
  }
}

// Funzione chiamata quando viene cliccato un pulsante
function handleButtonClick(isCorrect) {
  // Aggiorna il punteggio in base alla correttezza del clic
  if (isCorrect) {
    score++;
  } else {
    // Se non è corretto, riduci il punteggio di 1 (ma non meno di zero)
    score = Math.max(0, score - 1);
  }

  // Aggiorna il testo del punteggio
  document.getElementById("score").textContent = `Score: ${score}`;
  // Aggiorna i pulsanti del gioco
  updateButtons();
}

// Funzione per avviare il timer del gioco
function startTimer() {
  // Ottieni l'elemento del timer dal DOM
  const timerElement = document.getElementById("timer");

  // Imposta un intervallo che si ripete ogni secondo
  const interval = setInterval(() => {
    // Riduci il timer di 1 secondo
    timer--;

    // Se il timer raggiunge zero, reimposta il timer a 5 e aggiorna i pulsanti
    if (timer < 0) {
      timer = 10;
      updateButtons();
    }

    // Aggiorna il testo del timer
    timerElement.textContent = `Timer: ${timer}`;
  }, 1000);
}

// Avvia il gioco al caricamento della pagina
updateButtons();
startTimer();
