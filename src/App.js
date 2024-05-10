import './App.css';
import appleLogo from './AppleLogo.JPG';
import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function App() {
  const [count, setCount] = useState(0);
  const[inputNumber, setinputNumber] = useState('')
  
  const handleinputChange = (e) => {
    setinputNumber(e.target.value);
    const num = e.target.value
    if(!isNaN(num)|| num==='') 
      {
        setinputNumber(e.target.value);
      }
  }
  const addCount = () => {
    setCount(count + inputNumber);
  }
  function subtractCount() {
    setCount(count - 1);
  }
  return (
    <div  className="App">
       <div className = "leftDiv">
          This is the left div
          <AppleStock />
          <StockList inputNumber ={inputNumber} onInputChange={handleinputChange} count={count} onAdd={addCount} onSubtract={subtractCount} />
      </div>
      <div className = "rightDiv">
        <p>Number of Shares bought {count}</p>
      </div>
    </div>
  );
}


function StockList({count,inputNumber, onInputChange, onAdd, onSubtract} ) {

  return (
    <div>
      <h3>Buy and sell your shares</h3>
      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
        <div>
        <TextField
          id="filled-number"
          label="Share"
          type="number"
          value= {inputNumber}
          onChange={onInputChange}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        </div>
      </Box>
    
      <button onClick={onAdd}>
      Buy share
      </button>
      <button onClick={onSubtract}>
      Sell share
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
