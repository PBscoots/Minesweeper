export class Board {
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

  placeFlag(rowIndex,columnIndex){
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile is already flipped');
      return;
    } else  {
      this._playerBoard[rowIndex][columnIndex] = 'F';
    }
  };

  removeFlag(rowIndex,columnIndex){
    if (this._playerBoard[rowIndex][columnIndex] !== 'F') {
      console.log('This tile is already flipped');
      return;
    } else  {
      this._playerBoard[rowIndex][columnIndex] = ' ';
    }
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
