// Render square, check that it renders the value setted on the props and onClick function is called

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

export default Square