import React from 'react';
import  Board from './Board'
import '../stylesheets/index.css'
//import ReactDOM from 'react-dom';

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    //This following line ensures that if we “go back in time” and then make a
    //new move from that point, we throw away all the “future” history
    //that would now become incorrect.
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length-1]
    const squares = current.squares.slice()//slice() to make a copy of squares[] keeping things immutable
    if (calculateWinner(squares) || squares[i]) { //If something besides null is returned OR if the square clicked on already contains an item...
      return; //then return early b/c either somebody has already won the game or the square is already filled.
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    //unlike Array.push() .concat() doesn't mutuate the array
    this.setState({
      history: history.concat([{
        squares:squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history //make a copy of state.history[]
    //const current = history[history.length - 1] //the last item in the history[] array
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to Start of Game'
      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )

    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next Player ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
          squares={current.squares}
          onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

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


export default Game
