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
  let userGuess = {};
  console.log(Number(userGuess));
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
  if ( isNaN(userGuess) || isNaN(Number(userGuess)) ||  userGuess.length != 4 ){
    readGuess();
  }

  return userGuess.split("");
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
  console.log(secret);
  let attempt = 1;
  while (attempt < possibility + 1) {
    console.log(`${attempt}. lehetőség!`);
    let guess = readGuess();
    console.log("Játékos tippje", guess);
    let BlackCount = getBlackCount(guess, secret);
    let whiteCount = getWhiteCount(guess, secret);

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
document.querySelector('.js-start').addEventListener('click', gameLoop );
