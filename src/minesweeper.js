//I want to refactor this to not be two nested for loops. It would be better as
//one for loop and then the other, to copy what was created in the first.
//for example a 5x5 would take 25 steps with nested, and 10 with sequential
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows,numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('GAME OVER');
      this._board.print();
    } else if (this._board.hasSafeTiles()) {
      console.log('Current Board:');
      this._board.print();
    } else {
      console.log('You Win!');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard= Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    var board = [];
    for (var i = 0; i < numberOfRows; i++) {
      var row = [];
      for (var j = 0; j < numberOfColumns;j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  };

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let board = this.generatePlayerBoard(numberOfRows, numberOfColumns);
    let numberOfBombsPlaced = 0;
    var count = 0;//to look and see how many times it has to try again to place a bomb
    while (numberOfBombsPlaced < numberOfBombs) {
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
  };

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile is already flipped');
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';

    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  };

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1,1],[0,1],[1,1],[-1,0],[1,0],[-1,-1],[0,-1],[1,-1]];
    let numberOfRows = this._bombBoard.length;
    let numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex  = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if ((neighborRowIndex >= 0)&&(neighborRowIndex < numberOfRows)&&(neighborColumnIndex >= 0)&&(neighborColumnIndex < numberOfColumns)) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  };

  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBombs;
  };

  print(){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  get playerBoard () {
    return this._playerBoard;
  }
}

const g = new Game(2,2,1);

for (var i = 0; i < g._board._playerBoard.length; i++) {
  for (var j = 0; j < g._board._playerBoard[0].length; j++) {
    g.playMove(i,j);
  }
}

/*
g.playMove(0,0);
g.playMove(0,0);
g.playMove(0,1);
g.playMove(0,2);
g.playMove(1,0);
g.playMove(1,1);
g.playMove(1,2);
g.playMove(2,0);
g.playMove(2,1);
g.playMove(2,2);
*/
