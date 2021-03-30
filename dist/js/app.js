const colorsArr = [
	"red",
	"grey",
	"orange",
	"yellow",
	"blue",
	"green",
	"brown",
	"purple",
	"cyan",
];
function drawBoard() {
	let divArr = []; // Lehetséges választások megjelenítésére szolgáló tömb.
	let pickColorsArr = []; // A választható szinek megjelenítésére szolgáló tömb
	let smallContanierArr = []; //Lehetséges találatok és színek megjelenítésére szolgáló tömb.
	let smallItemArr = [];
	for (let i = 10; i >= 1; i--) {
		smallContanierArr.push(`<div class="small-container  row${i}"></div>`); // A találatok befogadására alkalmas mező kirajzolására való függvény
		for (let j = 1; j <= 4; j++) {
			divArr.push(`<div class="field__item  row${i}field__item${j}"></div>`); //Tippek megjelenítésére szolgáló mező legenerálása
		}
	}
	for (let pick of colorsArr) {
		pickColorsArr.push(
			`<div data-which="${pick}" class="js-choose  field__item  ${pick}"></div>`
		); // Lehetséges szinek választására szolgáló mező legenerálása
	}

	for (let k = 1; k <= 4; k++) {
		smallItemArr.push(`<div class="small__item${k}"></div>`);
	}

	// A legenerált tömbök megjelenítése
	document.querySelector(".field").innerHTML = divArr.join("");
	document.querySelector(".attempt").innerHTML = smallContanierArr.join("");
	/*[...document.querySelector(".small-container")].forEach(
		(circles) => (circles.innerHTML = smallItemArr.join(""))
	);*/
	document.querySelector(".pick").innerHTML = pickColorsArr.join("");
	document.querySelector(".js-start").addEventListener("click", gameLoop);
}

/* Egyes tippek, és a titkos kód kirajzolása színek szerint*/

/* Titkos kód generálása */

function generateDigit() {
	return String(Math.trunc(Math.random() * 9.0) + 1);
}

function generateSecret() {
	let result = [];
	while (result.length < 4) {
		let index = generateDigit();

		if (result.indexOf(index) < 0) {
			result.push(index);
		}
	}

	return result;
}
function userChoice() {
	[...document.querySelectorAll(".js-choose")].forEach((choose) =>
		choose.addEventListener("click", guessSelect)
	);

	return;
}
function guessSelect(event) {
	pickColor = `${event.currentTarget.dataset.which}`;
	userChoiceArr = [];
	userChoiceArr.push(pickColor);
	console.log(userChoiceArr);
}

function colorsComparison(guess, secret, attempt) {
	return;
}
/*function getBlackCount(guess, secret) {
	let match = 0;

	for (let i = 0; i < guess.length; ++i) {
		if (guess[i] === secret[i]) {
			match += 1;
		}
	}
	if (match === 0) {
		console.log("Nincs találat!");
	} else {
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
	if (found === 0) {
		console.log("Nincs találat");
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
}*/

function gameLoop() {
	const possibility = 10;
	const secret = generateSecret();
	console.log("Titok", secret);
	let attempt = 1;
	while (attempt <= possibility) {
		console.log(`${attempt}. lehetőség!`);
		let guess = userChoice();
		console.log("Játékos tippje", guess);
		/*let BlackCount = getBlackCount(guess, secret);
		let whiteCount = getWhiteCount(guess, secret);

		if (isGameWon(BlackCount)) {
			console.log("Nyertél");

			break;
		}
		if (attempt === possibility) {
			console.log("Vesztettél");

			break;
		}*/

		attempt += 1;
	}
	//	restart();
}
drawBoard();
