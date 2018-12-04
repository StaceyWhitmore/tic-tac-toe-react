import React from 'react'
import './Square'

//notice <Square> now recieves value from <Board> as a prop
//<Square> can now access 'value' by using 'this.props.value'
class Board extends React.Component {
  /*
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }
  */

  handleClick(i) {
    //.slice makes a copy of all of the values from the state object's 'squares' and places them into an array.
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) { //if there is a winner return early
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
  }

  renderSquare(i) {
    return <Square value={this.props.squares[i]}
                   onClick={() => this.props.onClick(i)}
     />;
  }


  render() {
    //const status = 'Next Player ' +   (this.state.xIsNext ? 'X' : 'O')
    const winner = calculateWinner(this.state.squares) //1st check to see if there is a winner
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next Player ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div>
        <div className="status">{status}</div>
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



function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
] //lines contains 8 arrays each with 3 ints

for (let i=0; i < lines.length; i++) {
  const [a,b,c] = lines[i]
  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    return squares[a]
  }
}
return null
}

export default Board
