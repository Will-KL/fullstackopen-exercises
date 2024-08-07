const Hello = (props) => {
  console.log("Hello from Hello component")
  return ( 
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}

const App = () => {
  console.log("Hello from App component")
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name='Peder'/>
    </div>
  )
}

export default App