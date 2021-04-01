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
let options = document.getElementsByClassName("js-choose");
let pickedColor = [];
let secret = [];
let guess = [];
let column = 1;
let row = 1;
function drawBoard() {
	let divArr = []; // Lehetséges választások megjelenítésére szolgáló tömb.
	let pickColorsArr = []; // A választható szinek megjelenítésére szolgáló tömb
	let smallContanierArr = []; //Lehetséges találatok és színek megjelenítésére szolgáló tömb.
	let smallItemArr = [];
	for (let i = 10; i >= 1; i--) {
		//	smallContanierArr.push(`<div class="small-container  row${i}"></div>`); // A találatok befogadására alkalmas mező kirajzolására való függvény
		for (let j = 0; j <= 3; j++) {
			divArr.push(`<div class="field__item  row${i}column${j}"></div>`);
			smallItemArr.push(`<div class="small__item  column${j}row${i}"></div>`); //Tippek megjelenítésére szolgáló mező legenerálása
		}
	}
	for (let pick of colorsArr) {
		pickColorsArr.push(
			`<div data-which="${pick}" class="js-choose  field__item  ${pick}"></div>`
		); // Lehetséges szinek választására szolgáló mező legenerálása
	}

	/*	for (let k = 0; k <= 3; k++) {
		smallItemArr.push(`<div class="small__item  column${k}"></div>`); // Találatok megjelenítésére szolgáló mezők legenerálása
	}*/

	// A legenerált tömbök megjelenítése
	document.querySelector(".field").innerHTML = divArr.join("");
	document.querySelector(".attempt").innerHTML = smallItemArr.join("");
	let cont = [...document.querySelectorAll(".small-container")];
	for (var i = 0; i < cont.length; i++) {
		cont[i].innerHTML = smallItemArr.join("");
	}

	document.querySelector(".pick").innerHTML = pickColorsArr.join("");
	//document.querySelector(".js-start").addEventListener("click", gameLoop);
}

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

function eventListener() {
	for (let option of options) {
		option.addEventListener("click", getPickedColor);
	}
}

function getPickedColor(picked) {
	pickedColor.push(picked.currentTarget.dataset.which);
	guess.push(colorsArr.indexOf(picked.currentTarget.dataset.which) + 1);

	console.log(guess);
	drawPickedColor(pickedColor, row);
	if (guess.length === 4) {
		colorsComparison(guess, secret);
		guess = [];
		pickedColor = [];
		row += 1;
	}
	column += 1;
}

function drawPickedColor(pickedColor, row) {
	console.log("row", row);
	console.log("szinek", pickedColor);

	for (let elem in pickedColor) {
		document
			.querySelector(`.row${row}column${elem}`)
			.classList.add(`${pickedColor[elem]}`);
	}
}

function colorsComparison(guess, secret) {
	let guessCode = guess.join("").split("");
	let match = 0;

	console.log("color1:", secret);
	console.log("color2:", guessCode);

	for (let i = 0; i < guessCode.length; ++i) {
		if (guessCode[i] === secret[i]) {
			match += 1;
		}
	}
	if (match === 0) {
		console.log("Nincs találat!");
	} else {
		console.log(`${match} találat a helyén van`);
	}

	drawHints(match, row);
}

function drawHints(match, row, column) {
	console.log("match", match);

	for (let success = 0; success < match; success++) {
		document.querySelector(`.column${success}row${row}`).classList.add(`black`);
	}
}

function gameLoop() {
	drawBoard();
	secret = generateSecret();
	console.log("secretCode ", secret);
	eventListener();
}
window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM fully loaded and parsed");
});
document.querySelector(".js-start").addEventListener("click", gameLoop);
