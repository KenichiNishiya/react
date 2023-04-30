import './App.css';
import {useEffect} from 'react';
import Axios from 'axios';
import {useState} from 'react';

function App() {
    const [catFact, setCatFact] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);
    
    // const [category,setCategory] = useState("");
    const [excuse,setExcuse] = useState("");
    // fetch("https://catfact.ninja/fact")
    // .then((res) => res.json())
    // .then((data => {
    //     console.log(data);
    // }))
    const fetchCatFact = () => {
        Axios.get("https://catfact.ninja/fact").then((res) => {
            setCatFact(res.data.fact);
        });
    }

    useEffect(() => {
        fetchCatFact();
    },[]);

    const fetchData = () =>{
        Axios.get(`https://api.agify.io/?name=${name}`).then((res) =>{
            setAge(res.data);
        });
    }

    const fetchExcuse = (category) =>{
        Axios.get(`https://excuser-three.vercel.app/v1/excuse/${category}/`).then((res)=>{
            {/*Use [0] because this api returns an array*/}
            setExcuse(res.data[0].excuse);
        })
    }

  return (
    <div className="App">
      <button onClick={fetchCatFact}> Generate cat fact</button>
      <p>{catFact}</p>
      <br/>
      <input placeholder='anemia' onChange={(event) => {setName(event.target.value)}}></input>
      <button onClick={fetchData}> Predict age </button>
      {/*The ? below is to only acess the object if it's not null*/}
      <p>Name: {age?.name}</p>
      <p>Predicted age: {age?.age}</p>
      <p>Count: {age?.count}</p>


      <h1>Generate an excuse</h1>
      <br/>
      <button onClick={()=>{fetchExcuse("party")}}>Party</button>
      <br/>
      <button onClick={()=>{fetchExcuse("family")}}>Family</button>
      <br/>
      <button onClick={()=>{fetchExcuse("office")}}>Office</button>
      <p>{excuse}</p>
    </div>
  );
}

export default App;
