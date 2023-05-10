import { useState,useEffect } from 'react';
import './App.css';
import background from './bg.jpeg'

// TODO
// consertar 2 blackjack seguido o segundo nao vai

document.body.style = "font-size:20px; font-weight: bold; color: white; text-align: center;    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;";
// document.body.style = "font-size:20px; font-weight: bold;  background: darkgreen; color: white; text-align: center;    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;";


function App() {
   
    const [cartas, setCartas] = useState([0, 0]);
    const [soma,setSoma] = useState(0);

    const [cartasDealer, setCartasDealer] = useState([0, 0]);
    const [somaDealer,setSomaDealer] = useState(0);

    const [resultado,setResultado] = useState("");
    const [apostou, setApostou] = useState(false);
    const [fim,setFim] = useState(false);

    const [fichasJogador,setFichasJogador] = useState(200);
    const [aposta,setAposta] = useState(0);
    const [novaAposta,setNovaAposta] = useState(0);
    const [ganhos,setGanhos] = useState(0);

    useEffect(() => {
        setSoma(cartas.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        setSomaDealer(cartasDealer.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    }, [cartas,cartasDealer]);

    useEffect(()=>{
        compararSomas();
    },[soma,somaDealer])
    //incluindo o fim acima, vencer maior soma funciona
    // mas
    //ganha blackjack duas vezes seguidas
    //perde por ultrapassar 21 duas vezes seguidas

    useEffect(()=>{
        // console.log("ganhos:",ganhos);
        setFichasJogador((fichasJogador)=>fichasJogador+ganhos);
        setAposta(0);
        setGanhos(0);
    },[ganhos]);

    useEffect(()=>{
        if(aposta < fichasJogador){
            if(aposta + novaAposta < 0){
                setAposta(0)
            }
            else{
                // setFichasJogador((fichasJogador) => fichasJogador - aposta);
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
        console.log(aposta)
    },[novaAposta])

    // useEffect(()=>{
    //       console.log("fichas depois aposta",fichasJogador)
    // },[fichasJogador])

    function pegarNovaCarta(){
        if(!fim && cartas[0] !== 0){
        setCartas([...cartas,novaCarta()])
        compararSomas();
        }
    }

    function compararSomas(){
        if(soma > 21 /*&& fim*/){
            setResultado("Perdeu")
            // console.log("perdeu, maior que 21")
            // console.log("soma:",soma)
            // console.log("cartas:",cartas)
            setAposta(0);
            setFim(true);
            setApostou(false);
        }
        // else if(soma > 21 && !fim ){
        //     setFim(true);

        // }
        else if(soma === 21 && somaDealer !== 21){
            /*Aqui ta funcionando*/
            setResultado("Blackjack!")
            // console.log("venceu, blackjack")
            // setFichasJogador((fichasJogador)=>fichasJogador + aposta*3);
            setGanhos(aposta*3)
            setFim(true);
            setApostou(false);
        }
        else if(soma === 21 && somaDealer === 21){
            setResultado("Empate")
            // setFichasJogador((fichasJogador)=>fichasJogador + aposta);
            setGanhos(aposta)
            setApostou(false);
        }
        else if(soma > somaDealer){
            setResultado("Venceu")
            // console.log("venceu,soma maior fim:",fim)
            // aqui o fim ta como false mesmo apos apertar o botao de finalizar
            // entao ele n vai pra baixo
            // tem que fazer o fim atualizar sincronamente
            if(fim){
                // setFichasJogador((fichasJogador)=>fichasJogador + aposta*2);
                // console.log("soma maior, fim positivo, ganhos:",ganhos)
                setGanhos(aposta*2);
            setApostou(false);
                // console.log("ganhou os ganhos:",ganhos)
            }
        }
        //fim fica false o tempo todo, 
            //Perdeu mas ta devolvendo as fichas
        else if(soma < somaDealer || soma === somaDealer){
            setResultado("Perdeu ")
        console.log("aposta",aposta,"novaAposta",novaAposta)
        console.log("assdkjkjkisf")
            // setAposta(0);
        }
    }

    // necessario para fornecer os ganhos de uma win normal
    useEffect(()=>{
        if(resultado === "Venceu" && fim){
            setGanhos(aposta*2);
        console.log("Venceu ganhos update normal")
        }
        else if(resultado === "Perdeu " && fim)
            setAposta(0);
    },[resultado,fim])

    function iniciarPartida() {
        // console.log("Fichas inicio",fichasJogador)
        if(aposta > 0){
        console.log("aposta",aposta,"novaAposta",novaAposta)
        setApostou(true);
        setFim(false);
        const cartasIniciais = [novaCarta(),novaCarta()];
        const cartasIniciaisDealer = [novaCarta(),novaCarta()];
        setCartas(cartasIniciais);
        setCartasDealer(cartasIniciaisDealer);
        setFichasJogador((fichasJogador)=>fichasJogador - aposta);
        // setAposta(0);

        }
    }

    function finalizarPartida(){
        setFim(true)
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
        console.log("apostar",fichasAposta)
        }
    }


    // useEffect(()=>{
        
    // })

    return (
      <div style={{backgroundImage: `url(${background})`,
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

        <br/>

        <p>Sua aposta: {aposta}</p>
        <p>Suas fichas: {fichasJogador}</p>

        <div className='divAposta'>
            <button className='buttonAposta' onClick={()=>{apostar(5)}}>+5</button>
            <button className='buttonAposta' onClick={()=>{apostar(10)}}>+10</button>
            <button className='buttonAposta' onClick={()=>{apostar(50)}}>+50</button>
        <br/>
            <button className='buttonAposta' onClick={()=>{apostar(-5)}}>-5</button>
            <button className='buttonAposta' onClick={()=>{apostar(-10)}}>-10</button>
            <button className='buttonAposta' onClick={()=>{apostar(-50)}}>-50</button>
        </div>

        <br/>
        <br/>

        <div className='divButton'>
            <button className='button' onClick={iniciarPartida}>Iniciar</button>
            <button className='button' onClick={pegarNovaCarta}>Pegar carta</button>
            <button className='button' onClick={()=>{!fim && cartas[0] !== 0 && 
                    setFim(true)
                setApostou(false)
            }}>Finalizar</button>
        </div>

      </div>
    );
}

const Jogador = (props) =>{
    return(
        <div className='jogador'>
            <h1>Jogador</h1>
            <p>Cartas: {props.cartas.join(", ")}</p>
            <p>Soma: {props.soma}</p>
        </div>
    )
}

const Dealer = (props) =>{
    return(
        <div className='dealer'>
        {props.fim ? 
            <div>
            <h1>Dealer</h1>
            <p>Cartas: {props.cartasDealer.join(", ")}</p>
            <p>Soma: {props.somaDealer}</p>
            </div>
            :
            <div>
            <h1>Dealer</h1>
            <p>Cartas: {props.cartasDealer[0]}, ?</p>
            <p>Soma: ?</p>
            </div>
        }
            
        </div>
    )
}
export default App;

