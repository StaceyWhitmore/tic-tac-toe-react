import React from 'react';
import ReactDOM, {render} from 'react-dom';
import './components/Game.js'
import './components/Board'//
import './components/Square'//

import './index.css';


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);

/*
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]//lines contains 8 arrays (each is a winning combo)
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] ) {
      return squares[a] //if above is falsy, keep iterating through loop, until it's not. Then, return squares[a]
    } //...keep running through for loop until squares[a] is returned
  }
return null //If loop runs all the way throguh squares[] and statement is never true then there is now winner yet. Return null
}//close calculateWinner( )
*/
