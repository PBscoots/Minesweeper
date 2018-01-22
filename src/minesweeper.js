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

const generateBombBoard = (board, numberOfBombs) => {
  let numberOfBombsPlaced = 0;
  var count = 0;//to look and see how many times it has to try again to place a bomb
  while (numberOfBombsPlaced < numberOfBombs) {
    //will use control flow to fix the possiblity to choose the same spot twice
    var randomRowIndex  = Math.floor(Math.random()*board.length);
    var randomColumnIndex  = Math.floor(Math.random()*board[0].length);
    if (board[randomRowIndex][randomColumnIndex]  != 'B') {
      numberOfBombsPlaced++;
      board[randomRowIndex][randomColumnIndex]  = 'B';
    }
    count++;
  }
  console.log('Times tried ' + count);
  return board;
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[1,-1]];
  let numberOfRows = bombBoard.length;
  let numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(offset => {
    const neighborRowIndex  = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if ((neighborRowIndex >= 0)&&(neighborRowIndex < numberOfRows)&&(neighborColumnIndex >= 0)&&(neighborColumnIndex < numberOfColumns)) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile is already flipped');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';

  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3,3);
let bombBoard   = generateBombBoard(playerBoard,3);

console.log('Player Board:');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 2,1);
flipTile(playerBoard, bombBoard, 2,2);
flipTile(playerBoard, bombBoard, 1,1);
flipTile(playerBoard, bombBoard, 0,0);
console.log('Updated Player Board');
printBoard(playerBoard);
