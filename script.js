const Words = [
	'money',
	'love',
	'butterfly',
	'plate',
	'cream',
	'cosmetics',
	'pills',
	'scrunchy',
	'toy',
	'iphone',
	'pictures',
	'bed',
	'chair',
	'table',
	'mirror',
	'computer',
	'wardrobe',
	'webcam',
	'keyboard',
]

const maxWrong = 6
let answer = ''
let mistakes = 0
let guessed = []
let wordStatus = null

function randomWord() {
	answer = Words[Math.floor(Math.random() * Words.length)]
	console.log(answer)
}

function generateButtons() {
	let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'
		.split('')
		.map(
			(letter) =>
				`
	<button
	class='alphabet__btn'
	id='` +
				letter +
				`'
	onClick='handleGuess("` +
				letter +
				`")'
	>
	` +
				letter +
				`
	</button>
	`
		)
		.join('')

	document.querySelector('.alphabet').innerHTML = buttonsHTML
}

function handleGuess(chosenLetter) {
	guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null
	document.getElementById(chosenLetter).setAttribute('disabled', true)

	if (answer.indexOf(chosenLetter) >= 0) {
		guessedWord()
		checkIfWon()
	} else if (answer.indexOf(chosenLetter) === -1) {
		mistakes++
		document.querySelector('.health__now').innerHTML = mistakes
		checkIfLose()
	}
}

function checkIfWon() {
	if (wordStatus === answer) {
		const win = document.querySelector('.win')
		win.style.transform = 'translateY(0%)'
	}
}

function checkIfLose() {
	if (mistakes === maxWrong) {
		const lose = document.querySelector('.end')
		lose.style.transform = 'translateY(0%)'
		const allBtn = document.querySelectorAll('.alphabet__btn')
		for (const iterator of allBtn) {
			iterator.setAttribute('disabled', true)
		}
	}
}

function guessedWord() {
	wordStatus = answer
		.split('')
		.map((letter) => (guessed.indexOf(letter) >= 0 ? letter : ' _ '))
		.join('')

	document.querySelector('.guess-word').innerHTML = wordStatus
}

function startApp() {
	randomWord()
	generateButtons()
	guessedWord()
	document.querySelector('.health__max').innerHTML = maxWrong
	document.querySelector('.health__now').innerHTML = mistakes
	const refreshBtn = document.querySelector('.health__restart')
	refreshBtn.addEventListener('click', () => {
		window.location.reload()
	})
}

startApp()
