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
while (attempt <= possibility) {
	console.log(`${attempt}. lehetőség!`);
	let guess;
	[...document.querySelectorAll(".js-choose")].forEach((choose) =>
		choose.addEventListener("click", guessSelect)
	);

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
function guessSelect() {
	let picked;
	[...document.querySelectorAll(".js-choose")].forEach((choose) =>
		choose.addEventListener("click", (e) => {
			picked = `${e.currentTarget.dataset.which}`;
		})
	);
	console.log("picked", picked);
	pickedColor.push(picked);
	console.log("pickedcolor", pickedColor);
	return pickedColor;
}

function gameLoop() {
	const possibility = 10;
	const secret = generateSecret();

	console.log("Titok", secret);
	let attempt = 1;
	guessSelect();
	console.log("Játékos tippje", pickedColor);
}
