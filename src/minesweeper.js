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
var blankBoard = generatePlayerBoard(30,3);
console.log(blankBoard);
