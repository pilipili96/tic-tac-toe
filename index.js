const $tds = $('td'); 
const $state = $('#state');
const $line = $('.line');
let state = '';

const STATES = {
	XMove: 'X to move',
	OMove: 'O to move',
	XWon: 'X won!',
	OWon: 'O won!',
	Draw: 'Draw!',
};

const XWonPatterns = {
	'row-1': /XXX....../,
	'row-2': /...XXX.../,
	'row-3': /......XXX/,
	'col-1': /X..X..X../,
	'col-2': /.X..X..X./,
	'col-3': /..X..X..X/,
	'diag-1': /X...X...X/,
	'diag-2': /..X.X.X../,
};

const OWonPatterns = {
	'row-1': /OOO....../,
	'row-2': /...OOO.../,
	'row-3': /......OOO/,
	'col-1': /O..O..O../,
	'col-2': /.O..O..O./,
	'col-3': /..O..O..O/,
	'diag-1': /O...O...O/,
	'diag-2': /..O.O.O../,
};

$('#reset').on('click', reset); //calls reset function when "reset" button is pressed

$tds.on('mouseover', function () { //adds gray background on hover to td that is moused over
	const $td = $(this);
	if ($td.text() === ' ' && state.endsWith('Move')) {
		$td.addClass('hover');
	}
});

$tds.on('mouseout', function () { //removes gray background when mouse no longer pointing to that td
	$(this).removeClass('hover');
});

$tds.on('click', function () { 
	const $td = $(this); // sets the td that is being clicked on to $td
	const value = $td.text();// checks what value td that is being clicked currently has
	if (value !== ' ') { // if that value does not equal to empty then return it
		return;
	}
	$td.removeClass('hover'); //as soon as td is clicked and value is assigned, hover is removed
	if (state === 'XMove') {
		$td.text('X');
		const wonClass = checkWon(XWonPatterns); //loop regexe's and return class that it is matches,if none matched 'this' will be undefined
		if (wonClass) {
			setState('XWon');
			$line.addClass(wonClass);
			return;
		}
		if (checkDraw()) { //checks if no more empty spaces and if tthats true returns draw
			setState('Draw');
			return;
		}
		setState('OMove');
	} else if (state === 'OMove') {
		$td.text('O');
		const wonClass = checkWon(OWonPatterns);
		if (wonClass) {
			setState('OWon');
			$line.addClass(wonClass);
			return;
		}
		setState('XMove');
	}
});

function checkWon (patterns) { //loop regexe's and return class that it is matches,if none matched- return undefined
	const text = $tds.text();
	return Object.keys(patterns).find(function (key) { 
		const pattern = patterns[key];
		return pattern.test(text);
	});
}

function checkDraw () {
	const text = $tds.text();
	return !text.includes(' ');
}

function setState (_state) { //set the game state and update the page with the game state
	state = _state;
	$state.text(STATES[state]);
}

function reset () {
	$tds.text(' ');
	$line.attr('class', 'line');
	setState('XMove');
}

$(document).ready(reset); //called when page loads adds empty spaces to add tds from line 100