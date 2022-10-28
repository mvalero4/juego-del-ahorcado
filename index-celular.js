// Localstorage

const getLocalStorage = () => {
  gameWords = JSON.parse(localStorage.getItem("gameWords"));
}
  
getLocalStorage();



//DOM

const containerMenu = document.querySelector('.container-menu');


const containerWord = document.querySelector('.container-word');
const word = document.querySelector('.word');

/*******************Dark mode **************************/

const checkbox = document.querySelector('.checkbox');
const slider = document.querySelector('.slider');
const icon1 = document.querySelector('.github');
const icon2 = document.querySelector('.instagram');
const icon3 = document.querySelector('.linkedin');


/*******************Game************************/

const gallowImage = document.querySelector('.horca');
const startGame = document.querySelector('.start-game');
const containerBody = document.querySelector('.container-body');
const containerButtonsGame = document.querySelector('.container-buttons-game');
const containerLetters = document.querySelector('.container-letters');
const correctLetters = document.querySelector('.correct-letters');
const wrongLetters = document.querySelector('.wrong-letters');
const attempts = document.getElementById('num-intentos');

const addWord = document.querySelector('.add-word');
const addedWord = document.querySelector('.added-word');
const textAlert = document.querySelector('.alert');
const alertContainer = document.querySelector('.alert-container');

const correctSpans = document.querySelectorAll(".correct-letters span");
const wrongSpans = document.querySelectorAll(".wrong-letters span");

const containerKeyboard = document.querySelector('.container-keyboard');
const keyboard = document.querySelectorAll(".keyboard span");
const keys = document.querySelector('.keyboard');



// Dark mode

slider.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('body-color');
  icon1.classList.toggle('icons-color');
  icon2.classList.toggle('icons-color');
  icon3.classList.toggle('icons-color');
  containerLetters.classList.toggle('container-letters-color');
  containerLetters.classList.toggle('container-letters');
  word.classList.toggle('word-color');
  word.classList.toggle('word');
  keys.classList.add('keyboard-color');
});





// Add word

addWord.addEventListener('click', () => {
  containerMenu.classList.toggle('hidden');
  containerWord.classList.toggle('hidden');
  containerKeyboard.classList.add('hidden');
});

function addWords() {
  let wordValue = word.value.toUpperCase().trim();
  let WordValid = validateWord(wordValue);
  if (WordValid) {
    gameWords.push(wordValue);
    saveLocalStorage();
    word.value = "";
    console.log({ gameWords, wordValue });
  }

  word.classList.toggle('hidden');
  addedWord.classList.toggle('hidden');
  containerMenu.classList.toggle('hidden');
}

addedWord.addEventListener('click', addWords);



//validamos que la palabra tenga mas de 3 letras y menos de 8
word.focus();

function validateWord(wordValue) {
  if (wordValue.length === 0) {
    setTimeout(() => {}, 1000);
    notification("No has ingresado ninguna palabra!", 'assets/close-circle-outline.svg');
    wordValue.focus();
    return false;
  }
  
  if (/^[a-zA-Z ]*$/.test(wordValue) === false) {
    setTimeout(() => {}, 1000);
    notification("No se permiten numeros ni caracteres especiales!", 'assets/close-circle-outline.svg');
    wordValue.value = "";
    wordValue.focus();
    return false;
    
  }
  
  if (gameWords.includes(wordValue)) {
    setTimeout(() => {}, 1000);
    notification("La palabra ya se encuentra agregada!", 'assets/close-circle-outline.svg');
    wordValue.value = "";
    wordValue.focus();
    return false;
  }

  if (wordValue.length >= 3 && wordValue.length <= 8) {
    setTimeout(() => {window.open("./index.html", "_self")}, 2800);
    notification("Palabra agregada con Exito!", 'assets/icon-head-win.svg');
    return true;    
  } 
  
  if(wordValue.length < 3) {
    setTimeout(() => {}, 1000);
    notification("Cantidad de Letras Invalidas!", 'assets/close-circle-outline.svg');
    wordValue.value = "";
    wordValue.focus();
    return false;
  }
}

word.focus();




// Start game


startGame.addEventListener('click', () => {
  containerBody.classList.remove('hidden');
  containerMenu.classList.add('hidden');
  containerButtonsGame.classList.remove('hidden');
  containerLetters.classList.remove('hidden');
  containerWord.classList.add('hidden');
  containerKeyboard.classList.toggle('hidden');
});



// Game

// validamos si el usuario va agotando sus intentos
const head = document.querySelector('.head');
const body = document.querySelector('.body');
const arm1 = document.querySelector('.arm1');
const arm2 = document.querySelector('.arm2');
const leg1 = document.querySelector('.leg1');
const leg2 = document.querySelector('.leg2');

const validateDrawBody = () => {
  if (counter === 5) {
    head.classList.remove("hidden");
  } else if (counter === 4) {
    body.classList.remove("hidden");
  } else if (counter === 3) {
    arm1.classList.remove("hidden");
  } else if (counter === 2) {
    arm2.classList.remove("hidden");
  } else if (counter === 1) {
    leg1.classList.remove("hidden");
  } else if (counter === 0) {
    leg2.classList.remove("hidden");
  }
};



//creamos la funcion para mostrar las notificaciones de victoria o derrota

const notification = (text, img) => {
  const imgAlert = document.createElement("img");
  textAlert.textContent = "";
  alertContainer.classList.add("hidden");
  textAlert.classList.add("hidden");
  setTimeout(() => {textAlert.classList.remove("hidden"); alertContainer.classList.remove("hidden")}, 1800);
  imgAlert.src = img;
  imgAlert.classList.add("icon-head");
  textAlert.textContent = text;
  textAlert.appendChild(imgAlert);
};

word.focus();



// creamos la funcion para escoger una palabra aleatoria dentro del array de palabras predeterminadas
const sortedWord = gameWords[Math.floor(Math.random() * gameWords.length)];

const randomWord = () => {
  console.log(sortedWord);
  return sortedWord;
};


const createSpanCorrect = () => {
  let wordRandom = randomWord();
  for (let i = 1; i <= wordRandom.length; i++) {
    const spanLetter = document.createElement("span");
    correctLetters.appendChild(spanLetter);
  }
  return wordRandom;
};

let letterCorrect = createSpanCorrect();
let counter = 6;
let counterWrongLetters = 0;
let letterValid = true;
let countWin = 0;
attempts.textContent = counter;


// creamos la funcion para que el usuario presione una letra y se valide con el ratón

document.addEventListener('click', (e) =>{
  const correctSpans = document.querySelectorAll(".correct-letters span");
  
  if(e.target.matches(".keyboard span")){
    keyboard.forEach((key) => {
      key.addEventListener('click', () => {
        for (const indexLetter in letterCorrect){
          if (key.textContent === letterCorrect[indexLetter]) {
            correctSpans[indexLetter].textContent = letterCorrect[indexLetter];
            letterCorrect = letterCorrect.replace(letterCorrect[indexLetter], "1");
            countWin++;
            letterValid = true;
          } else{
            letterValid = false;
            counterWrongLetters++;
            attempts.textContent = counter;
          }
        }
      })
    })

    if (!letterValid)
    if (counter > 0) {
      counter--;
    }
    
    validateDrawBody();
    attempts.textContent = "";
    attempts.textContent = counter;

    if (counter === 0) {
      setTimeout(() => {
        window.open("../index.html", "_self");
      }, 4800);
      notification(
        `Perdiste! la palabra secreta era:  ${sortedWord}`,
        "assets/close-circle-outline.svg"
      );
    }

    if (countWin === correctSpans.length) {
      setTimeout(() => {
        window.open("../index.html", "_self");
      }, 4800);
      notification("Ganaste! Bien hecho!", "assets/close-circle-outline.svg");
    }
  }
});





const reloadGame = document.querySelector('.reload-game');
const giveUp = document.querySelector('.give-up');


// creamos la funcion para restablecer el juego cuando el usuario presione el boton de nuevo juego
const restaureGame = () => {
  setTimeout(() => {
    window.open("../index.html", "_self");
  }, 3000);
  notification("Reiniciando...", "assets/icons8-refresh.svg");
};
reloadGame.addEventListener("click", restaureGame);


// creamos la funcion de volver al inicio cuando el usuario presione el boton de rendirse
const leaveGame = () => {
  setTimeout(() => {
    window.open("../index.html", "_self");
  }, 5800);
  notification(
    `Te rendiste!...La palabra secreta era: \n ${sortedWord} `,
    "assets/close-circle-outline.svg"
  );
};
giveUp.addEventListener("click", leaveGame);



