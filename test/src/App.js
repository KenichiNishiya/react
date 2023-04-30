import './App.css';
import {useState} from 'react';
import {User} from './User.js';
import {Employee} from './Employee.js';
import {Planets} from './Planets.js';

// let isRuby = true
const distros = ["Ubuntu", "Debian", "Arch", "Fedora", "popOS"]

function App() {
    {/*Variable age, create setAge function to alter it, set it to 0 initially*/}
    const [age,setAge] = useState(0);

    const increaseAge = () =>{
        setAge(age+1);
    }

    const [isRuby, setRuby] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [showText, setShowText] = useState(true);
    const [sudo,setSudo] = useState(false);
    const [textColor,setTextColor] = useState("black");

    const [count,setCount] = useState(0);

    const users = [
        {name: "Linus", age: 40},
        {name: "Stallman", age: 51},
        {name: "Satya", age: 90}
    ];

    const planets =[
        {name: "Mars", isGasPlanet: false},
        {name: "Earth", isGasPlanet: false},
        {name: "Jupiter", isGasPlanet: true},
        {name: "Venus", isGasPlanet: false},
        {name: "Neptune", isGasPlanet: true},
        {name: "Uranus", isGasPlanet: true}
    ]

    const changeToAqua = () =>{
        setRuby(false);
    }

    const changeToRuby = () =>{
        setRuby(true);
    }

    {/*Any input type with a onChange property has an event paramenter*/}
    const handleInputChange = (event) =>{
        setInputValue(event.target.value);
    }

    // const toggleText = () =>{
    //     {showText ? setShowText(false) : setShowText(true)};
    // }

    // const handleGreetingChange = () =>{
    //     {greetingText!=="" ? setGreetingText("") : setGreetingText(sampleGreeting)}
    // };

  return (
    <div className="App">

      <h1>Age: {age}</h1>
      <button onClick={increaseAge}>Increase age</button>

      <br/>
      <input type="text" onChange={handleInputChange}></input>
      <p>{inputValue}</p>

      {planets.map((planet,key) => {
           // return planet.isGasPlanet && <p>{planet.name}</p> 
           return <Planets name={planet.isGasPlanet && planet.name}/>
      })}

      {/*Ternary operation, if root then 1st statement, else 2nd statement*/}
      {sudo === true ? <h1>Welcome root</h1> : <h1>Welcome user</h1>}
      {/*Anonymous or inline function*/}
      <button onClick={() => {setSudo(!sudo)}}>Change user</button>
      <h1 style={{color: textColor}}>Color changing with css</h1>
      <button 
        onClick={() => {
            setTextColor(textColor === "black" ? "red" : "black")
        }}>
          Change color
      </button>
      <h1 style={{color: "aqua"}}>Colored text</h1>
      <h1 style={{color: isRuby ? "red" : "aqua"}}>Colored text</h1>

      {isRuby ? <button onClick={changeToAqua}>Change to aqua</button> : <button onClick={changeToRuby}>Change to ruby</button>}

      <br/><br/>

      {/*Ternary operation without any else you use only &&*/}
      {isRuby && <button>Rubbuton</button>}

      <br/><br/>

      <button onClick={() => {showText ? setShowText(false) : setShowText(true)}}>Show/Hide</button>
      {showText && <h1>Hello how are you?</h1>}

      {/*List uses the map function on an array, key is not used but wants to be passed*/}
      {distros.map((distro,key) => {
          return <h1 key={key}>{distro}</h1>
      })}

      {users.map((user,key) => {
          return <User name={user.name} age={user.age}/>
          // return <div>{user.name} {user.age}</div>
      })}

      {/*Components use these attributes as props*/}
      <Employee name="Tux" age={12} email="tux@tux.com"/>
      <Job salary={30000} position="Developer" company="Linux"/>


      <p>Count:{count}</p>
      <button onClick={() => {setCount(count+1)}}>Increase</button>
      <button onClick={() => {setCount(count-1)}}>Decrease</button>
      <button onClick={() => {setCount(0)}}>Set to zero</button>

    </div>
  );

}

// The following is a representation of props if it was a simple js object
// const props = {
//     name: "Tux",
//     Age: 12,
//     email: "tux@tux.com"
// }

// This should be in another file, but for demonstration porpuses I will leave it here
const Job = (props) => {
    return(
        <div>
            <p>{props.salary}</p>
            <p>{props.position}</p>
            <p>{props.company}</p>
        </div>
    );
};

export default App;
