//I want to refactor this to not be two nested for loops. It would be better as
//one for loop and then the other, to copy what was created in the first.
//for example a 5x5 would take 25 steps with nested, and 10 with sequential
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns;j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  var board = [];
  for (var i = 0; i < numberOfRows; i++) {
    var row = [];
    for (var j = 0; j < numberOfColumns;j++) {
      row.push(null);
    }
    board.push(row);
  }
  var numberOfBombsPlaced = 0;
  var count = 0;//to look and see how many times it has to try again to place a bomb
  while (numberOfBombsPlaced < numberOfBombs) {
    //will use control flow to fix the possiblity to choose the same spot twice
    var randomRowIndex  = Math.floor(Math.random()*numberOfRows);
    var randomColumnIndex  = Math.floor(Math.random()*numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex]  != 'B') {
      numberOfBombsPlaced++;
    }
    board[randomRowIndex][randomColumnIndex]  = 'B';
    count++;
  }
  console.log(count);
  return board;

}

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3,4);
let bombBoard   = generateBombBoard(30,30,50);
console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
