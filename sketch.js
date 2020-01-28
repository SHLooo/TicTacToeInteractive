let board = [];
let size = 3;
board.length = size;
let unitLength = 160; // the length of the sigle black
let players = ['o', '×']
let currentplayer;
let margin = 120; // the distance of (the bottom of the last block) and (the bottom of the canvas)
let winner;
let gameCount = 0;
let xCount = 0;
let oCount = 0;
let tieCount = 0;
let checkWinner = false;

function buildBoard() {
  for (let i = 0; i < 3; ++i) {
    board[i] = ['', '', ''];
  }
  // If there is a winner, the loser starts the next game.
  // Otherwise, order is ramdomly decided
  if (checkwinner() && winner == 'x') {
    currentplayer = 'o';
  } else if (checkwinner() && winner == 'o') {
    currentplayer = 'o';
  } else {
    currentplayer = random(players);
  }
  // reset the checkWinner boolean
  checkWinner = false;
}


function setup() {
  createCanvas(size * unitLength, size * unitLength + margin);
  // build the game board
  buildBoard();
  // create a button to reset the board
  let buttonWidth;
  let buttonHeight = unitLength / 3;
  var resetBoardButton = createButton("Reset Board");
  resetBoardButton.position(unitLength, height);
  resetBoardButton.style('width', unitLength + 'px');
  resetBoardButton.style('height', buttonHeight + 'px');
  resetBoardButton.style('font-size', 16*unitLength/100 + 'px');
  resetBoardButton.style('background-color', color(25, 23, 200, 50));
  resetBoardButton.mousePressed(buildBoard);

  // create a button to restart the game
  var newGameButton = createButton("New Game");
  newGameButton.position(unitLength, height + buttonHeight);
  newGameButton.style('width', unitLength + 'px');
  newGameButton.style('height', unitLength / 3 + 'px');
  newGameButton.style('font-size', 16*unitLength/100 +'px');
  newGameButton.style('background-color', color(25, 23, 200, 50));
  newGameButton.mousePressed(restartGames);

  // Initialize the gameDisplay
  xWins = createDiv();
  oWins = createDiv();
  tie = createDiv();
  totalGame = createDiv();
}


function draw() {
  background(220);
  // draw the board, including the pieces and the grid
  drawBoard();
  // Display the status of the players. i.e. next player/winner/tie
  displayPlayerStatus();
  // Display the status of the game. i.e. × Wins/o Wins/Ties/Total Games
  displayGameStatus();
}


// draw the board, including the pieces and the grid
function drawBoard() {
  // display the content of the board
  for (let i = 0; i < size; ++i) {
    for (let j = 0; j < size; ++j) {
      let spot = board[i][j];
      let x = unitLength * (j + 0.5);
      let y = unitLength * (i + 0.5);
      textSize(68 * (unitLength / 100));
      textAlign(CENTER, CENTER);
      text(spot, x, y);
    }
  }
  // draw the grid
  for (let i = 0; i <= size; ++i) {
    color(20);
    line(0, unitLength * i, unitLength * size, unitLength * i);
  }
  for (let i = 0; i <= size; ++i) {
    color(20);
    line(unitLength * i, 0, unitLength * i, unitLength * size);
  }
}


function displayGameStatus() {
  let x = width + 10;
  let y = unitLength/3.5;
  textSize(24);
  textAlign(RIGHT, TOP);
  xWins.html("x Wins: " + xCount);
  xWins.position(x, 10);
  xWins.style('font-size', 20*unitLength/100 + 'px');
  oWins.html("o Wins: " + oCount);
  oWins.position(x, y);
  oWins.style('font-size', 20*unitLength/100 + 'px');
  tie.html("Ties: " + tieCount);
  tie.position(x, 2 * y);
  tie.style('font-size', 20*unitLength/100 + 'px');
  gameCount = xCount + oCount + tieCount;
  totalGame.html("Total Games: " + gameCount);
  totalGame.position(x, 3 * y);
  totalGame.style('font-size', 20*unitLength/100 + 'px');
}


// Display the winner or tie when the game is over
function displayPlayerStatus() {
  x = width / 2;
  y = height - margin / 2;
  textSize(58 * (margin / 100));
  textAlign(CENTER, CENTER);
  if (checkwinner()) {
    if (winner == 'tie') {
      // print 'tie'
      text('tie', x, y);
      if (!checkWinner) {
        ++tieCount;
        checkWinner = true;
      }
    } else if (winner == '×') {
      // print the winner
      text('winner: ' + '×', x, y);
      if (!checkWinner) {
        ++xCount;
        checkWinner = true;
      }
    } else if (winner == 'o') {
      text('winner: ' + 'o', x, y);
      if (!checkWinner) {
        ++oCount;
        checkWinner = true;
      }
    }
  } else {
    // print which player should move next
    text("next:" + " " + currentplayer, x, y);
  }
}


function restartGames() {
  winner = 'tie';
  buildBoard();
  xCount = 0;
  oCount = 0;
  tieCount = 0
}


// return the result of "a=b=c"
function tripleEqual(a, b, c) {
  return (a == b && a == c);
}


// check if the board is full
function isfull() {
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      let spot = board[i][j];
      if (spot == '') {
        return false;
      }
    }
  }
  return true;
}


// Check if there is a winner or tie
// return true if the game is over(there is a winner or tie)
// return false otherwise
function checkwinner() {
  for (i = 0; i < size; ++i) {
    // horizontally
    if (tripleEqual(board[i][0], board[i][1], board[i][2]) &&
      board[i][0] != '') {
      winner = board[i][0];
      return true;
    }
    // vertically
    else if (tripleEqual(board[0][i], board[1][i], board[2][i]) &&
      board[0][i] != '') {
      winner = board[0][i];
      return true;
    }
  }
  // diagonally
  if ((tripleEqual(board[0][0], board[1][1], board[2][2]) ||
      tripleEqual(board[0][2], board[1][1], board[2][0])) &&
    board[1][1] != '') {
    winner = board[1][1];
    return true;
  }
  // board is full
  else if (isfull()) {
    winner = 'tie';
    return true;
  }
  return false;
}


// change the content of the board depending on which spot is clicked
// return 2 if a step is made successfully, return 1 otherwise
function setXO(board, char) {
  if (mouseX > 0 && mouseX < unitLength) {
    if (mouseY > 0 && mouseY < unitLength && board[0][0] == '') {
      board[0][0] = char;
      return 2;
    } else if (mouseY > unitLength && mouseY < 2 * unitLength && board[1][0] == '') {
      board[1][0] = char;
      return 2;
    } else if (mouseY > 2 * unitLength && mouseY < 3 * unitLength && board[2][0] == '') {
      board[2][0] = char;
      return 2;
    }
  } else if (mouseX > unitLength && mouseX < 2 * unitLength) {
    if (mouseY > 0 && mouseY < unitLength && board[0][1] == '') {
      board[0][1] = char;
      return 2;
    } else if (mouseY > unitLength && mouseY < 2 * unitLength && board[1][1] == '') {
      board[1][1] = char;
      return 2;
    } else if (mouseY > 2 * unitLength && mouseY < 3 * unitLength && board[2][1] == '') {
      board[2][1] = char;
      return 2;
    }
  } else if (mouseX > 2 * unitLength && mouseX < 3 * unitLength) {
    if (mouseY > 0 && mouseY < unitLength && board[0][2] == '') {
      board[0][2] = char;
      return 2;
    } else if (mouseY > unitLength && mouseY < 2 * unitLength && board[1][2] == '') {
      board[1][2] = char;
      return 2;
    } else if (mouseY > 2 * unitLength && mouseY < 3 * unitLength && board[2][2] == '') {
      board[2][2] = char;
      return 2;
    }
  }
  return 1;
}


// make the move
function mousePressed() {
  if (!checkwinner()) {
    if (currentplayer == '×') {
      let a = setXO(board, '×');
      // switch roles only if a placement was made successfully
      if (a == 2) {
        currentplayer = 'o';
      }
    } else {
      let a = setXO(board, 'o');
      // switch roles only if a placement was made successfully
      if (a == 2) {
        currentplayer = '×';
      }
    }
  }
}