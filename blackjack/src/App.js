import { useState,useEffect } from 'react';
import './App.css';
import background from './bg.jpeg'

// TODO
// consertar 2 blackjack seguido o segundo nao vai

document.body.style = "font-size:20px; font-weight: bold; color: white; text-align: center;    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;";

function App() {
   
    const [cartas, setCartas] = useState([0, 0]);
    const [soma,setSoma] = useState(0);

    const [cartasDealer, setCartasDealer] = useState([0, 0]);
    const [somaDealer,setSomaDealer] = useState(0);

    const [resultado,setResultado] = useState("");
    const [apostou, setApostou] = useState(false);
    const [fim,setFim] = useState(false);

    const [fichasJogador,setFichasJogador] = useState(100);
    const [aposta,setAposta] = useState(0);
    const [novaAposta,setNovaAposta] = useState(0);
    const [ganhos,setGanhos] = useState(0);

    useEffect(() => {
        setSoma(cartas.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        setSomaDealer(cartasDealer.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    }, [cartas,cartasDealer]);

    useEffect(()=>{
        compararSomas();
        if(somaDealer < 17){
            setCartasDealer([...cartasDealer,novaCarta()]);
            setSomaDealer(cartasDealer.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        }
    },[soma,somaDealer])

    useEffect(()=>{
        setFichasJogador((fichasJogador)=>fichasJogador+ganhos);
        setAposta(0);
        setGanhos(0);
    },[ganhos]);

    useEffect(()=>{
        if(aposta < fichasJogador){
            if(aposta + novaAposta < 0){
                setAposta(0);
            }
            else{
                setAposta((aposta) => aposta + novaAposta);
                setNovaAposta(0);
            }
        }
        else{
            if(novaAposta < 0){
                setAposta((aposta) => aposta + novaAposta);
                setNovaAposta(0);
            }
            else{
                setAposta(fichasJogador);
            }
        }
    },[novaAposta])

    function pegarNovaCarta(){
        if(!fim && cartas[0] !== 0){
        setCartas([...cartas,novaCarta()]);
        compararSomas();
        }
    }

    function compararSomas(){
        if(soma > 21){
            setResultado("Perdeu");
            setAposta(0);
            setFim(true);
            setApostou(false);
        }

        else if(soma === 21 && somaDealer !== 21){
            setResultado("Blackjack!");
            setGanhos(aposta*3);
            setFim(true);
            setApostou(false);
        }
        else if(soma === 21 && somaDealer === 21){
            setResultado("Empate");
            setFim(true);
            setGanhos(aposta);
            setApostou(false);
        }
        else if(soma > somaDealer || somaDealer > 21){
            setResultado("Venceu");
            if(fim){
                setGanhos(aposta*2);
                setApostou(false);
            }
        }
        else if(soma < somaDealer || soma === somaDealer){
            setResultado("Perdeu ");
        }
    }

    useEffect(()=>{
        if(resultado === "Venceu" && fim){
            setGanhos(aposta*2);
        }
        else if(resultado === "Perdeu " && fim)
            setAposta(0);
    },[resultado,fim])

    function iniciarPartida() {
        if(aposta > 0){
            setApostou(true);
            setFim(false);
            const cartasIniciais = [novaCarta(),novaCarta()];
            const cartasIniciaisDealer = [novaCarta(),novaCarta()];
            setCartas(cartasIniciais);
            setCartasDealer(cartasIniciaisDealer);
            setFichasJogador((fichasJogador)=>fichasJogador - aposta);
        }
    }

    function finalizarPartida(){
        if(!fim && cartas[0] !== 0){
            setFim(true)
            setApostou(false)
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

    function apostar(fichasAposta){
        if(!apostou){
        setNovaAposta(fichasAposta);
        }
    }

    return (
        <div className='appDiv' style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition:"center",
            backgroundSize: "cover",
            height: "100vh",
        }}>
            <h1 className='h1'>Blackjack</h1>
            <br/>
            <div className='wrapper'>
                <Jogador cartas={cartas} soma={soma}/>
                {fim && <p className='res'>{resultado}</p>}
                <Dealer fim={fim} cartasDealer={cartasDealer} somaDealer={somaDealer}/>
            </div>

            <div id='divStats'>
                <p className='p'>Sua aposta: {aposta}</p>
                <p className='p'>Suas fichas: {fichasJogador}</p>
            </div>

            <div className='divAposta'>
                <button className='buttonAposta' onClick={()=>{apostar(5)}}>+5</button>
                <button className='buttonAposta' onClick={()=>{apostar(10)}}>+10</button>
                <button className='buttonAposta' onClick={()=>{apostar(50)}}>+50</button>
                <button className='buttonAposta' onClick={()=>{apostar(-5)}}>-5</button>
                <button className='buttonAposta' onClick={()=>{apostar(-10)}}>-10</button>
                <button className='buttonAposta' onClick={()=>{apostar(-50)}}>-50</button>
            </div>
            <br/>
            <div className='divButton'>
                <button className='button' onClick={iniciarPartida}>Iniciar</button>
                <button className='button' onClick={pegarNovaCarta}>Pegar carta</button>
                <button className='button' onClick={finalizarPartida}>Finalizar</button>
            </div>
       </div>
    );
}

    const Jogador = (props) =>{
        return(
            <div className='jogador'>
                <h1>Jogador</h1>
                <p className='p'>Cartas: {props.cartas.join(", ")}</p>
                <p className='p'>Soma: {props.soma}</p>
            </div>
        )
    }

    const Dealer = (props) =>{
        return(
            <div className='dealer'>
            {props.fim ? 
                <div>
                <h1>Dealer</h1>
                <p className='p'>Cartas: {props.cartasDealer.join(", ")}</p>
                <p className='p'>Soma: {props.somaDealer}</p>
                </div>
                :
                <div>
                <h1>Dealer</h1>
                <p className='p'>Cartas: {props.cartasDealer[0]}, ?</p>
                <p className='p'>Soma: ?</p>
                </div>
            }
            </div>
        )
    }
    export default App;
