import './App.css';
import appleLogo from './AppleLogo.JPG';
import { useState } from 'react';


function App() {
  const [count, setCount] = useState(0);

  function addCount() {
    setCount(count + 1);
  }
  function subtractCount() {
    setCount(count - 1);
  }
  return (
    <div  className="App">
       <div className = "leftDiv">
          This is the left div
          <AppleStock />
          <StockList count={count} onAdd={addCount} onSubtract={subtractCount} />
      </div>
      <div className = "rightDiv">
        <p>Number of Shares bought {count}</p>
      </div>
    </div>
  );
}


function StockList({count, onAdd, onSubtract} ) {
  return (
    <div>
      <h3>Buy and sell your shares</h3>
      <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
      <button onClick={onAdd}>
      Buy one share
      </button>
      <button onClick={onSubtract}>
      Sell one share
      </button>
    </div>
  );
}

function AppleStock() {
  return (
    <div>
      <img src={appleLogo} width = "100" />
      <p>Current Price: $163</p>
    </div>
  );
}

export default App;
