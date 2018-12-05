import React from 'react'
import '../stylesheets/index.css'


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

export default Square
