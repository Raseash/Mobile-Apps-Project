import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      
      <StockList />
    </div>
  );
}
function BuyButton() {
  return (
    <button>
       buy
    </button>
  );
}
function SellButton() {
  return (
    <button>
       sell
    </button>
  );
}
 function StockList() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <SellButton />
      <BuyButton />
    </div>
  );
}

export default App;
