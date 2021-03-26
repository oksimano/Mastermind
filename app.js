function generateDigit() {
  randomArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  while ( userGuess == null ||userGuess.length !== 4 ){
    userGuess = prompt("Adj meg 4 különböző számot 1 és 9 közt! Mi a tipped?");
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
  let hint = secret.slice(0);
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
    gameLoop(10);
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
