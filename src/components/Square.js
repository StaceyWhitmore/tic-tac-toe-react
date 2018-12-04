import React from 'react'
import '../index.css'

const Square = (props) => {
  //When you call setState in a component,
  //React automatically updates the child components inside of it too.

    return (
      <button className="square"
              onClick={props.onClick}>
              {props.value}
      </button>
    );
}

export default Square
