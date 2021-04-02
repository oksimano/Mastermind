const OPTIONSOFCOLORS = [
	"red",
	"grey",
	"orange",
	"yellow",
	"blue",
	"green",
	"brown",
	"purple",
];
let classOfOptions = document.getElementsByClassName("js-choose"); //Kiválasztható szinek osztálya
let guess = []; // Játékos által választott színek sorszáma, max 4 darab
let secret = []; // Random 4 jegyű titkos kód, ami nem ismétlődik
let attempt = 1; // Lehetőségek száma
let pickedColor = []; //A játékos által választott szín

/*
 *	Kirajzolja a játékteret
 *
 *	@return undefined
 */
function drawBoard() {
	let divArr = []; // Lehetséges választások megjelenítésére szolgáló tömb.
	let pickColorsArr = []; // A választható szinek megjelenítésére szolgáló tömb
	let secretCodeArr = []; // Titkós kód helye
	let smallItemArr = []; // A segítség megjelenítsére szolgáló tömb
	for (let i = 10; i >= 1; i--) {
		for (let j = 0; j <= 3; j++) {
			divArr.push(`<div class="field__item  row${i}column${j}"></div>`); // Lehetséges választások megjelenítésére szolgáló mező legenerálása..
			smallItemArr.push(`<div class="small__item  column${j}row${i}"></div>`); //Tippek megjelenítésére szolgáló mező legenerálása
		}
	}
	/*
	 *	Titkós kód helyének legenerálása
	 */
	for (let k = 0; k <= 3; k++) {
		secretCodeArr.push(`<div class=" field__item  secret__item${k}"></div>`);
	}
	/*
	 **	Legenerálja a színválasztékot html formátumban
	 */

	for (let pick of OPTIONSOFCOLORS) {
		pickColorsArr.push(
			`<div data-which="${pick}" class="js-choose  field__item  ${pick}"></div>`
		);
	}
	/*
	 * A legenerált tömbök megjelenítése
	 */
	document.querySelector(".secret").innerHTML = secretCodeArr.join("");
	document.querySelector(".field").innerHTML = divArr.join("");
	document.querySelector(".attempt").innerHTML = smallItemArr.join("");
	document.querySelector(".pick").innerHTML = pickColorsArr.join("");
}

/* Titkos kód generálása */
/**
 * Legenerál egy '1' és '8' közötti számjegyet
 *
 * @return string
 */
function generateDigit() {
	return String(Math.trunc(Math.random() * 8.0) + 1);
}

/**
 * Legenerálja a négyjegyű titkos megoldást.
 *
 * @return Tömb '1' és '9'közt - A négy elemű nem ismétlődő titkos megoldás
 */
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

/**
 * Színválasztékot figyeli, melyik színre kattintunk.
 *
 * meghívja a getPickedColor fv-t
 *
 *@return undefined
 */
function eventListener() {
	for (let option of classOfOptions) {
		option.addEventListener("click", getPickedColor);
	}
}
/**
 * A kiválasztott színt átadja a játkos tippjébe és kirajzolja azt.
 *
 * Bemeneti értéke az eventListener által átadott MouseEvent
 *
 * meghívja a kirajzolófv és az összehasonlító fv-kett és a segítséget kirajzoló fv-ket
 *
 * @return undefined
 */
function getPickedColor(picked) {
	let colorMatch;
	let colorHint;

	pickedColor.push(picked.currentTarget.dataset.which);
	guess.push(OPTIONSOFCOLORS.indexOf(picked.currentTarget.dataset.which) + 1);
	drawPickedColor(pickedColor, attempt);

	if (guess.length === 4) {
		colorMatch = getBlackCount(guess, secret);
		drawBlack(colorMatch, attempt);
		colorHint = getWhiteCount(guess, secret);
		drawWhite(colorHint, attempt, colorMatch);
		guess = [];
		pickedColor = [];
		attempt += 1;
	}

	if (attempt === 11 || colorMatch === 4) {
		drawSecretCode(secret);
		//meghivni , hogy vége
		//kiirni, hogy vége
		//kirajzolni a titkos kódot
	}
}

/**
 * Kirajzolja a tippet a képernyőre
 *
 * Bemeneti értékei: Object, a kiválasztott szín és a lehetőségek száma
 *
 * @return undefined
 */
function drawPickedColor(pickedColor, attempt) {
	for (let elem in pickedColor) {
		document
			.querySelector(`.row${attempt}column${elem}`)
			.classList.add(`${pickedColor[elem]}`);
	}
}
/**
 * Összehasonlítja a játékos tippjét és a titkós kódot, és megadja azt, hogy van-e pontos találat
 *
 * Bemeneti értékei: Játékos tippje Object, Titkos kód tömb
 *
 * @return Number, találatok száma
 */
function getBlackCount(guess, secret) {
	let guessCode = guess.join("").split("");
	let match = 0;

	console.log("Játékos tippje:", guessCode);

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

	return match;
}
/**
 * Összehasonlítja a játékos tippjét és a titkós kódot, és megadja azt, hogy van-e egyezés , ami nem jó helyen van
 *
 * Bemeneti értékei: Játékos tippje Object, Titkos kód tömb
 *
 * @return Number, találatok száma
 */
function getWhiteCount(guess, secret) {
	let found = 0;
	let guessCopy = guess.join("").split("");

	for (let i = 0; i < secret.length; ++i) {
		if (secret[i] !== guessCopy[i]) {
			for (let j = 0; j < secret.length; ++j) {
				if (
					secret[i] === guessCopy[j] &&
					secret[j] !== guessCopy[j] &&
					i !== j
				) {
					found += 1;
					guessCopy[j] = null;
					break;
				}
			}
		}
	}
	if (found === 0) {
		console.log("Nincs egyezés");
	} else {
		console.log(`${found} egyezés nincs a helyén!`);
	}
	return found;
}
/**
 * Kirajzolja a telitalálatokat
 *
 * Bemeneti értékei: Találat, lehetőségek száma
 *
 * @return undefined
 */
function drawBlack(match, attempt) {
	for (let success = 0; success < match; success++) {
		document
			.querySelector(`.column${success}row${attempt}`)
			.classList.add(`black`);
	}
}
/**
 * Kirajzolja a színegyezést, amik nem jó helyen vannak
 *
 * Bemeneti értékei: egyezés, találat, lehetőségek száma
 *
 * @return undefined
 */
function drawWhite(found, row, match) {
	for (let hint = 0; hint < found; hint++) {
		document
			.querySelector(`.column${hint + match}row${attempt}`)
			.classList.add(`white`);
	}
}
/**
 * Kirajzólja a titkós kódot a végén.
 *
 * Bemeneti értékei: titkós kód
 *
 * @return undefined
 */
function drawSecretCode(secret) {
	let secretArr = [];
	for (let secretItem of secret) {
		secretArr.push(OPTIONSOFCOLORS[secretItem - 1]);
	}

	for (let i = 0; i <= 3; i++) {
		document
			.querySelector(`.secret__item${i}`)
			.classList.add(`${secretArr[i]}`);
	}
}

/*
 *	Indítás
 *
 */
function gameLoop() {
	drawBoard();
	guess = [];
	secret = [];
	attempt = 1;
	pickedColor = [];
	secret = generateSecret();
	console.log("Titkos kód ", secret);
	eventListener();
}
console.clear();
window.addEventListener("DOMContentLoaded", (event) => {
	console.log("DOM fully loaded and parsed");
});
document.querySelector(".js-start").addEventListener("click", gameLoop);
