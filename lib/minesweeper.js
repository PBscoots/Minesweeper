"use strict";

//I want to refactor this to not be two nested for loops. It would be better as
//one for loop and then the other, to copy what was created in the first.
//for example a 5x5 would take 25 steps with nested, and 10 with sequential


var g = new Game(4, 4, 3);

for (var i = 0; i < g._board._playerBoard.length; i++) {
  for (var j = 0; j < g._board._playerBoard[0].length; j++) {
    g.playMove(i, j);
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