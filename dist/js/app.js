const red = 1;
const grey = 2;
const orange = 3;
const yellow = 4;
const blue = 5;
const green = 6;
const brown = 7;
const purple = 8;
const cyan = 9;
const colorsArr = ["red", "grey", "orange", "yellow", "blue", "green", "brown", "purple", "cyan"]
function board() {
  let divArr = [];
  for ( let i = 10; i > 0; i--) {
      for (let j = 1; j < 5; j++) {
          divArr.push(`<div class=" field__item row${i}field__item${j}"></div>`);
          
      }
     
  }
  document.querySelector('.field').innerHTML = divArr.join('');
  
  document.querySelector('.js-start').addEventListener('click', gameLoop);
}

/* Egyes tippek, és a titkos kód kirajzolása színek szerint*/

function colors(guess, secret, attempt){
  for (elem of guess) {
    console.log("elem: ", elem);
    document.querySelector(`.row${attempt}field__item${elem}`).classList.add('red');
  }
 /* document.querySelector(`.row${possibility}field__item${secret[elem]}').classList.add('red'`)*/
 return;
}


/* Titkos kód generálása */

function generateDigit() {
  
  return String(Math.trunc(Math.random() * 9.0) + 1);
}

function generateSecret() {
  let result = [];
  while ( result.length < 4 ) {
    let index = generateDigit();

    if (result.indexOf(index) < 0) {
      result.push(index);
    }
  }

  return result;
}


function readGuess() {
  let userGuess = [];
  
/*
  while ( isNaN(userGuess) && userGuess.length !== 4 && isNaN(Number(userGuess)) ){
    userGuess = prompt("Adj meg 4 különböző számot 1 és 9 közt! Mi a tipped?");
  } */

 /* do {
    userGuess = prompt("Adj meg 4 különböző számot 1 és 9 közt! Mi a tipped?");
    console.log("Szám-e" , Number(userGuess));
    
    console.log(isNaN(userGuess));
   
  }while ( !isNaN(userGuess) && !isNaN(Number(userGuess)) && userGuess.length !== 4 );*/

  userGuess = prompt("Adj meg 4 különböző számot 1 és 9 közt! Mi a tipped?");
/*  console.log(isNaN(userGuess));
  console.log(isNaN(Number(userGuess)));
  console.log(userGuess);*/
  if ( isNaN(userGuess) || isNaN(Number(userGuess)) || userGuess == " " || userGuess.length != 4 ){
    
    readGuess();
  }
  let userGuessSplit = userGuess.split("");
  return userGuessSplit;
}



function getBlackCount(guess, secret) {
  let match = 0;

  for ( let i = 0; i < guess.length; ++i ) {
    if (guess[i] === secret[i]) {
      match += 1;
    }
  }
  if (match === 0) {
    console.log('Nincs találat!');
  }
  else {
    console.log(`${match} találat a helyén van`);
  }
    return match;
}

function getWhiteCount(guess, secret) {
  let found = 0;
  
  for (let ch = 0; ch < guess.length; ++ch) {
    if (guess[ch] !== secret[ch]) {
      for (let x of secret) {
        if (guess[ch] === x) {
          found += 1;
        }
      }
    }
  }
  if (found === 0){
    console.log('Nincs találat');
  } else {
    console.log(`${found} találat nincs a helyén!`);
  }
  return found;
}

function isGameWon(BlackCount) {
  if (BlackCount === 4) {
    return true;
  }
}
function restart() {
  let restart = prompt("Akarsz új játékot kezdeni? I/N");
  if (restart === "i") {
    console.log("Új játék");
    gameLoop();
  } else {
    return;
  }
}

function gameLoop() {
  const possibility = 10;
  const secret = generateSecret();
  console.log("Titok", secret);
  let attempt = 1;
  while (attempt < possibility + 1) {
    console.log(`${attempt}. lehetőség!`);
    let guess = readGuess();
    console.log("Játékos tippje", guess);
    let BlackCount = getBlackCount(guess, secret);
    let whiteCount = getWhiteCount(guess, secret);
    let drawColor = colors(guess, secret, attempt);
    if (isGameWon(BlackCount)) {
      console.log("Nyertél");
      restart();
      break;
    }
    if (attempt === possibility) {
      console.log("Vesztettél");
      restart();
      break;
    }

    attempt += 1;
  }
}
board();
