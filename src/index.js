import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
To collect data from multiple children, or to have two child components
communicate with each other, you need to declare the shared state in their
parent component instead. The parent component can pass the state Back Down
to the children by using Props; this keeps the child components in sync with
each other and with the parent component.
*/

/*functions don't have a 'this' scope so change 'this.props.value'
to just 'props.value' etc.
Also, we won't be needing an arrow func since we won't be accessing 'this'  we
will get rid of the () => too.

} {

}
*/
function Square(props) {
  /*
  When you call setState in a component,
  React automatically updates the child components inside of it too.
  */
  //render() {
    return (
      <button className="square"
              onClick={props.onClick}>
              {props.value}
      </button>
    );
  //}
}

//notice <Square> now recieves value from <Board> as a prop
//<Square> can now access 'value' by using 'this.props.value'
class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
       />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}//close <Board>

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history
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
      xIsNext: !this.state.xIsNext,
    })
  }

  render() {
    const history = this.state.history //make a copy of state.history[]
    const current = history[history.length - 1] //the last item in the history[] array
    const winner = calculateWinner(current.squares)

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
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
