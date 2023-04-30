import './App.css';
import {useState, useEffect} from 'react';
import {Text} from './Text.js'

function App() {
    const [showText,setShowText] = useState(false);
    const toggleText = () =>{
        setShowText(!showText);
    }


  return (
    <div className="App">
      <h1>Effect hook</h1>
      <button onClick={toggleText}> Show text </button>
      {showText && <Text/>}
    </div>
  );
}

export default App;
