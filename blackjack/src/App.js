import { useState,useEffect } from 'react';
import './App.css';
 
function App() {
   
    const [cartas, setCartas] = useState([0, 0]);
    const [soma,setSoma] = useState(0);

    const [cartasDealer, setCartasDealer] = useState([0, 0]);
    const [somaDealer,setSomaDealer] = useState(0);

    const [resultado,setResultado] = useState("");
    const [fim,setFim] = useState(false);

    useEffect(() => {
        setSoma(cartas.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        setSomaDealer(cartasDealer.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    }, [cartas,cartasDealer]);

    useEffect(()=>{
        setResultado(resultado);
    },[resultado])

    useEffect(()=>{
        compararSomas();
    },[soma,somaDealer])
      // useEffect(() => {
      //   setResultado(sum);
      // }, [sum]);

    function pegarNovaCarta(){
        setCartas([...cartas,randomCard()])
        compararSomas();
    }

    function compararSomas(){
        if(soma > 21){
            setResultado("Perdeu")
            setFim(true);
        }
        else if(soma === 21 && somaDealer !== 21){
            setResultado("Venceu")
        }
        else if(soma === 21 && somaDealer === 21){
            setResultado("Empate")
        }
        else if(soma > somaDealer){
            setResultado("Venceu")
        }
        else{
            setResultado("Perdeu")
        }
        console.log(soma,somaDealer)
    }

    function iniciarPartida() {
        setFim(false)
        const cartasIniciais = [randomCard(),randomCard()];
        const cartasIniciaisDealer = [randomCard(),randomCard()];
        setCartas(cartasIniciais);
        setCartasDealer(cartasIniciaisDealer);

    }

    function finalizarPartida(){
        setFim(true)
    }

    function randomCard(){
        let random = Math.floor(Math.random() * 13) + 1
        if (random > 10){
            return 10
        }
        else if (random === 1){
            return 11
        }
        else {
            return random 
        }
    }

    return (
      <div>
        <p>Cartas: {cartas.join(', ')}</p>
        <p>Soma: {soma}</p>
        <br/>
        <p>Cartas Dealer: {cartasDealer.join(', ')}</p>
        <p>Soma Dealer: {somaDealer}</p>
        <button onClick={iniciarPartida}>Iniciar Partida</button>
        <button onClick={pegarNovaCarta}>Pegar carta</button>
        <button onClick={finalizarPartida}>Finalizar partida</button>
        {fim && <p>Resultado: {resultado}</p>}
      </div>
    );
}
export default App;
