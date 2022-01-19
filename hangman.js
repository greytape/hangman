const words = [
  "acid",
  "blade",
  "country",
  "danger",
  "existence",
  "expansion",
  "eye",
  "face",
  "future",
  "garden",
  "hair",
  "important",
  "jelly",
  "kick",
  "lift",
  "low",
  "married",
  "nerve",
  "observation",
  "owner",
  "page",
  "quality",
  "run",
  "sad",
  "same",
  "shelf",
  "table",
  "twist",
  "use",
  "voice",
  "waiting",
  "year",
]

const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

let word = null;
let currentGuessedLetters = [];
let currentWordContainer = null;
let imageContainer = null;
let guessedLettersContainer = null;
let incorrectGuessNumber = 0;

function getNewWord() {
  let randomWordIndex = Math.round(Math.random() * words.length)
  return words[randomWordIndex];
};

function newGuess(event) {
  key = event.key.toUpperCase();
  if (invalidKey(key)) return null;

  currentGuessedLetters.push(key);
  checkLatestGuess(key);
  renderContent();
  checkEndGameConditions();
}

function invalidKey(key) {
  if (alphabet.includes(key)) return false

  return true
}

function startNewGame() {
  word = getNewWord().toUpperCase();
  currentGuessedLetters = [];
  incorrectGuessNumber = 0;
  renderContent();
};

function wordLetters() {
  return word.split('');
}

function setLatestImage() {
  newSrcAttribute = `assets/${incorrectGuessNumber}.jpg`;
  imageContainer.setAttribute('src', newSrcAttribute);
}

function checkLatestGuess(letter) {
  if (!wordLetters().includes(letter)) {
    incorrectGuessNumber += 1;
  }
}

function checkEndGameConditions() {
  if (incorrectGuessNumber >= 10) loseGame();
  if (correctlyGuessedLetters().length == wordLetters().length) winGame();
}

function loseGame() {
  setTimeout(() => {
    alert(`You have lost! The word was ${word}`);
    startNewGame();
  }, 500);
}

function winGame() {
  setTimeout(() => {
    alert(`You have won! You made just ${incorrectGuessNumber} incorrect guesses.`);
    startNewGame();
  }, 500);
}

function correctlyGuessedLetters() {
  return wordLetters().filter( (letter) => {
    return currentGuessedLetters.includes(letter);
  });
}

function incorrectlyGuessedLetters() {
  return currentGuessedLetters.filter( (letter) => {
    return !wordLetters().includes(letter);
  });
}

function wordWithGuessedLetters() {
  if (correctlyGuessedLetters().length === 0) { 
    return wordLetters().map((letter) => '_');
  }

  return wordLetters().map((letter) => {
    if (correctlyGuessedLetters().includes(letter)) {
      return letter;
    } else {
      return '_';
    }
  });
};

function renderContent() {
  currentWordContainer.textContent = wordWithGuessedLetters().join(' ');
  guessedLettersContainer.textContent = incorrectlyGuessedLetters().join(' ');
  setLatestImage();
}

document.addEventListener('DOMContentLoaded', () => {
  currentWordContainer = document.getElementById('current-word-container');
  imageContainer = document.getElementById('image-container');
  guessedLettersContainer = document.getElementById('guessed-letters-container');
  document.addEventListener('keydown', newGuess);
  startNewGame();
});