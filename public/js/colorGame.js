var difficulty = [3, 6, 9];
var difficultyLevel = 1;
var difficultyNames = [];

var colors;
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var rules = document.styleSheets[0].cssRules;

init();

//starts the game
function init(){
	for (var i = 0; i < modeButtons.length; i++){
		difficultyNames.push(modeButtons[i].innerHTML);
	}
	setUpModeButtons();
	setUpResetButton();
	setUpSquaresListeners();
	setBoard();
}

//adds listeners to mode buttons
function setUpModeButtons(){
	for (button of modeButtons){
		button.addEventListener("click", function(){
			difficultyLevel = difficultyNames.indexOf(this.innerHTML);
			setBoard();
		});
	}
}

//adds listeners to all squares
function setUpSquaresListeners(){
	for (square of squares){
		square.addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor){
				messageDisplay.textContent = "Correct";
				changeColors(clickedColor);
				resetButton.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

// 
function generateSquares(num){
	//TODO: make this function! delete old squares and create num squares as divs in html
	//NOTE: this should replace resetSquares()
}

//sets squares to new colors and enables/disables
function resetSquares(){
	for (var i = 0; i < squares.length; i++){
		//add initial colors to squares
		if (colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
}

//adds listener to reset button
function setUpResetButton(){
	resetButton.addEventListener("click", setBoard);
}

//sets fresh board
function setBoard(){
	colors = generateColors(difficulty[difficultyLevel]);
	//pick a new random color from array
	pickedColor = pickColor();
	//change color display
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "steelblue";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for (button of modeButtons){
		button.classList.remove("selected");
		button.disabled = false;
	}
	markSelected();

	//Creates squares
	generateSquares(difficulty[difficultyLevel]);

	resetSquares();

	//reset button colors
	changeButtonColors("steelblue");
}

//sets all active squares to winning color
function changeColors(color){
	//loop through all squares
	for (var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
	//change top to correct color
	h1.style.backgroundColor = color;
	//this doesn't do anything yet
	changeButtonColors(color);
}

//sets buttons to the winning color
function changeButtonColors(color){	
	for (rule of rules){
		if (rule.selectorText === ".selected"){
			//change css .selected backgroundColor to input color
			rule.style.backgroundColor = color;
		} else if (rule.selectorText === "button:hover"){
			//change css button:hover backgroundColor to input color
			rule.style.backgroundColor = color;
		} else if (rule.selectorText === "button"){
			//change css button color to input color
			rule.style.color = color;
		}
	}
}

//return a random color from colors
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//return a new array of colors given length num
function generateColors(num){
	//make empty array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i < num; i++){
		arr.push(randomColor());
	}
	//return array
	return arr;
}

//returns a random color
function randomColor(){
	//pick a red from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a green from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a blue from 0-255
	var b = Math.floor(Math.random() * 256);
	//caution! spaces after commas!
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

//changes button to selected
function markSelected(){
	modeButtons[difficultyLevel].classList.add("selected");
	modeButtons[difficultyLevel].disabled = true;
}