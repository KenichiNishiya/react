import { useState,useEffect } from 'react';
import './App.css';

// TODO
// Esconder os valores das cartas antes de apertar o botao de start pela primeira vez
// Implementar sistema de apostas
// Estilizar a pagina
// Implementar 1 = 11 dependendo da situacao
// Colocar as letras respectivas (JQK)
 
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
        compararSomas();
    },[soma,somaDealer])

    function pegarNovaCarta(){
        if(!fim){
        setCartas([...cartas,novaCarta()])
        compararSomas();
        }
    }

    function compararSomas(){
        if(soma > 21){
            setResultado("Perdeu")
            setFim(true);
        }
        else if(soma === 21 && somaDealer !== 21){
            setResultado("Venceu")
            setFim(true);
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
        const cartasIniciais = [novaCarta(),novaCarta()];
        const cartasIniciaisDealer = [novaCarta(),novaCarta()];
        setCartas(cartasIniciais);
        setCartasDealer(cartasIniciaisDealer);

    }

    function finalizarPartida(){
        if(!fim){
        setFim(true)
        }
    }

    function novaCarta(){
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
        <Jogador cartas={cartas} soma={soma}/>
        <br/>
        <Dealer fim={fim} cartasDealer={cartasDealer} somaDealer={somaDealer}/>
        <button onClick={iniciarPartida}>Iniciar Partida</button>
        <button onClick={pegarNovaCarta}>Pegar carta</button>
        <button onClick={finalizarPartida}>Finalizar partida</button>
        {fim && <p>Resultado: {resultado}</p>}
      </div>
    );
}

const Jogador = (props) =>{
    return(
        <div>
            <p>Cartas: {props.cartas.join(", ")}</p>
            <p>Soma: {props.soma}</p>
        </div>
    )
}

const Dealer = (props) =>{
    return(
        <div>
        {props.fim ? 
            <div>
            <p>Cartas Dealer: {props.cartasDealer.join(", ")}</p>
            <p>Soma Dealer: {props.somaDealer}</p>
            </div>
            :
            <p>Cartas Dealer: {props.cartasDealer[0]}, ?</p>
        }
            
        </div>
    )
}
export default App;
