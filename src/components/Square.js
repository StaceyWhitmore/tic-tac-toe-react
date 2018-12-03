import React from 'react'

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

export default Square
