import './App.css';
import appleLogo from './AppleLogo.JPG';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Label, ReferenceLine } from 'recharts';
import Button from '@mui/material/Button';
import moment from 'moment'; // imported for date formatting





function App() {
  const [count, setCount] = useState(0);
  const [inputNumber, setinputNumber] = useState(0)
  const [total, setTotalText] = useState('')
  const [shares, setShareText] = useState('')
  const [currentPrice, setCurrentPrice] = useState(163)


  const handleinputChange = (e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num) || input === '') {
      setinputNumber(num);
    }
  }

  const addCount = () => {
    setCount(count + inputNumber);
    setTotalText(`You bought: ${inputNumber} Apple Share  | Total: ${inputNumber * currentPrice}`);
    if (inputNumber >= 100) {
      setCurrentPrice(currentPrice + 10)
    }
  }

  function subtractCount() {
    setCount(count - inputNumber);
    setTotalText(`You sold: ${inputNumber} Apple Shares | Total:  ${inputNumber * currentPrice}`);
    if (inputNumber >= 100) {
      setCurrentPrice(currentPrice - 10)
    }
  }

  useEffect(() => {
    if (inputNumber && currentPrice) {
      setShareText(`${inputNumber} X $${currentPrice} => Total: ${inputNumber * currentPrice}`);
    }
  }, [inputNumber, currentPrice])

  const handlepriceChange = (num) => {
    let c = parseInt(num)
    if (num !== undefined && !isNaN(num)) {
      setCurrentPrice(c);
    }
  }

  return (
    <div className="App">
      <div className="leftDiv">

        <AppleStock currentPrice={currentPrice} />
        <StockTransactions shareText={shares} inputNumber={inputNumber} onInputChange={handleinputChange} count={count} onAdd={addCount} onSubtract={subtractCount} />
        <br></br>
        <p>{total}</p>
      </div>
      <div className="rightDiv">
        <div style = {{height: "100px"}}></div>
        <StockGraph currentPrice={currentPrice} onPriceChange={handlepriceChange} />

      </div>
    </div>
  );
}


function StockTransactions({ shareText, count, inputNumber, onInputChange, onAdd, onSubtract }) {

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
            size="small"
            id="outlined-size-small filled-number"
            label="Share"
            type="number"
            value={inputNumber}
            onChange={onInputChange}
            inputProps={{

              min: 0,
              step: 1
            }}
            variant="filled"
          />
        </div>
      </Box>
      <p>{shareText}</p>
      <button onClick={onAdd}> Buy share </button>
      <button onClick={onSubtract}> Sell share </button>
    </div>
  );
}

function AppleStock({ currentPrice }) {
  return (
    <div>
      <img src={appleLogo} width="100" />
      <p>Current Price: ${currentPrice}</p>
    </div>
  );
}

const StockGraph = ({ currentPrice, onPriceChange }) => {
  const [lastDataPoint, setLastDataPoint] = useState({});
  const dataRef = useRef([]);

  useEffect(() => {
    const generateInitialData = () => {
      let currentTime = moment();
      return Array.from({ length: 10 }, (_, i) => ({
        x: currentTime.subtract(30 * i, 'seconds').format('YYYY/MM/DD h:mm:ss a'), // Full date for tool tip
        y: 150 + Math.random() * 25
      })).reverse();
    };

    dataRef.current = generateInitialData();
    setLastDataPoint(dataRef.current[dataRef.current.length - 1]);
    

    const interval = setInterval(() => {
      const nextY = 150 + Math.random() * 25;
      const nextX = moment().format('YYYY/MM/DD h:mm:ss a'); // Full date for tool tip
      dataRef.current.push({ x: nextX, y: nextY });
      dataRef.current = dataRef.current.slice(-10);

      setLastDataPoint(dataRef.current[dataRef.current.length - 1]);
      onPriceChange(dataRef.current[dataRef.current.length - 1].y)
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateData(currentPrice); // Update the graph when price changes
  }, [currentPrice]);

  const updateData = (newPrice) => {
    const nextX = moment().format('YYYY/MM/DD h:mm:ss a');
    dataRef.current[dataRef.current.length - 1].y = newPrice
    // setData((prevData) => [...prevData.slice(-9), { x: nextX, y: newPrice }]); // Keep last 10 data points
  };
  
  const formatXAxis = (tickItem) => {
    // Use moment to format the tick item, which is the date
    return moment(tickItem, 'YYYY/MM/DD h:mm:ss a').format('h:mm');
  };

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '5px', border: '1px solid #ccc' }}>
          <p className="label">{`Time: ${label}`}</p>

          <p className="intro">{`Price: $${payload[0].value.toFixed(2)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div>
      <LineChart width={650} height={300} data={dataRef.current}
        margin={{ top: 5, right: 10, left: 50, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" tickFormatter={formatXAxis} />
        <YAxis domain={[150, 175]} tickCount={6}>
          <Label value="Price ($)" angle={-90} position="insideLeft" offset={-30} style={{ textAnchor: 'middle' }} />
        </YAxis>
        <Tooltip content={customTooltip} />

        <ReferenceLine y={currentPrice} stroke="green" strokeDasharray="5 5" label={{ position: 'left', value: `Price: $${currentPrice}`, fill: 'green', fontSize: 12 }} />
        <Line type="linear" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};


export default App