import './App.css';
import appleLogo from './AppleLogo.JPG';
import { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );


function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div  className="App">
       <div className = "leftDiv">
          This is the left div
          <AppleStock />
          <StockList count={count} onClick={handleClick}  />
      </div>
      <div className = "rightDiv">
        This is the right div
        {count}
      </div>
    </div>
  );
}


function StockList({count, onClick} ) {
  return (
    <div>
      <h3>Buy and sell your shares</h3>
      <button onClick={onClick}>
      bought {count} times
      </button>
      <button>Sell</button>
    </div>
  );
}

function AppleStock() {
  return (
    <div>
      <img src={appleLogo} width = "100" />
      <p>Current: $163</p>
    </div>
  );
}
export default App;
