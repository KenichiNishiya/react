import { useState,useEffect } from 'react';
import './App.css';
import {Jogador} from './Jogador'
import {Dealer} from './Dealer'
import background from './bg.jpeg'

// Setting some css for the whole page directly with js
document.body.style = "font-size:20px; font-weight: bold; color: white; text-align: center;    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;";

function App() {
   
    // Player 
    const [cartas, setCartas] = useState([0, 0]);
    const [soma,setSoma] = useState(0);

    // Dealer
    const [cartasDealer, setCartasDealer] = useState([0, 0]);
    const [somaDealer,setSomaDealer] = useState(0);

    // Game state
    const [resultado,setResultado] = useState("");
    const [apostou, setApostou] = useState(false);
    const [fim,setFim] = useState(false);

    // Betting system
    const [fichasJogador,setFichasJogador] = useState(100);
    const [aposta,setAposta] = useState(0);
    const [novaAposta,setNovaAposta] = useState(0);
    const [ganhos,setGanhos] = useState(0);

    useEffect(()=>{
        document.title='Blackjack';
    },[]);

    // When the cards are updated, the sums is also updated
    useEffect(() => {
        setSoma(cartas.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        setSomaDealer(cartasDealer.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    }, [cartas,cartasDealer]);

    // When the sums are updated, they are compared
    // If the dealer's sum is less than 17, it buys more cards until it's 17 or over
    useEffect(()=>{
        compararSomas();
        if(somaDealer < 17){
            setCartasDealer([...cartasDealer,novaCarta()]);
            setSomaDealer(cartasDealer.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        }
    },[soma,somaDealer])

    // Whenever the player wins something, it receives the chips and resets some states
    useEffect(()=>{
        setFichasJogador((fichasJogador)=>fichasJogador+ganhos);
        setAposta(0);
        setGanhos(0);
    },[ganhos]);

    // Checks if the value the player wants to bet makes sense
    // Don't let the player bet more than they have, nor a negative value
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

    // Checks wether the player has won something
    useEffect(()=>{
        if(resultado === "Venceu" && fim){
            setGanhos(aposta*2);
            setApostou(false);
        }
        else if(resultado === "Empate" && fim){
            setGanhos(aposta);
        }
        else if(resultado === "Perdeu " && fim){
            setAposta(0);
        }
    },[resultado,fim])

    function pegarNovaCarta(){
        if(!fim && cartas[0] !== 0){
        setCartas([...cartas,novaCarta()]);
        compararSomas();
        }
    }

    function compararSomas(){
        if(soma > 21){
            if(cartas.indexOf(11) !== -1){
                setCartas(cartas.map((card)=>{
                    if(card === 11){
                        return 1;
                    }
                    else{
                        return card;
                    }
                }));
            }
        else if(somaDealer > 21){
            if(cartasDealer.indexOf(11) !== -1){
                setCartasDealer(cartasDealer.map((cardDealer)=>{
                    if(cardDealer === 11){
                        return 1;
                    }
                    else{
                        return cardDealer;
                    }
                }));
            }
        }

        else{
            setResultado("Perdeu");
            setAposta(0);
            setFim(true);
            setApostou(false);

            }
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
        else if(soma === somaDealer && soma !== 0){
            setResultado("Empate");
            if(fim){
                setGanhos(aposta);
                setApostou(false);
            }
        }
        else if(soma > somaDealer || somaDealer > 21){
            setResultado("Venceu");
        }
        else if(soma < somaDealer){
            setResultado("Perdeu ");
            setApostou(false);
        }
    }

    function iniciarPartida() {
        if(aposta > 0 && fichasJogador > 0){
            setResultado("");
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
                <Jogador cartas={cartas} soma={soma} alteraCartas={setCartas}/>
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

export default App;
