import { useState,useEffect } from 'react';
import './App.css';

// TODO
// Consertar venceu por maior carta nao ta dando a aposta (fim = false)

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
    },[novaAposta])

    // useEffect(()=>{
    //       console.log("fichas depois aposta",fichasJogador)
    // },[fichasJogador])

    function pegarNovaCarta(){
        if(!fim){
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
        }
        else if(soma === 21 && somaDealer === 21){
            setResultado("Empate")
            // setFichasJogador((fichasJogador)=>fichasJogador + aposta);
            setGanhos(aposta)
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
                // console.log("ganhou os ganhos:",ganhos)
            }
        }
        //fim fica false o tempo todo, 
        else if(soma < somaDealer){
            setResultado("Perdeu, soma menor")
        console.log("aposta",aposta,"novaAposta",novaAposta)
        console.log("assdkjkjkisf")
            // console.log("Perdeu acho q por soma menor")
            // setAposta(0);
        }
    }

    // necessario para fornecer os ganhos de uma win normal
    useEffect(()=>{
        if(resultado === "Venceu" && fim){
            setGanhos(aposta*2);
        console.log("Venceu ganhos update normal")
        }
        else if(resultado === "Perdeu, soma menor" && fim)
            setAposta(0);
    },[resultado,fim])

    function iniciarPartida() {
        // console.log("Fichas inicio",fichasJogador)
        console.log("aposta",aposta,"novaAposta",novaAposta)
        setFim(false);
        const cartasIniciais = [novaCarta(),novaCarta()];
        const cartasIniciaisDealer = [novaCarta(),novaCarta()];
        setCartas(cartasIniciais);
        setCartasDealer(cartasIniciaisDealer);
        setFichasJogador((fichasJogador)=>fichasJogador - aposta);
        // setAposta(0);
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
        setNovaAposta(fichasAposta);
    }

    function instawin(){
        setSoma(20);
        setSomaDealer(1);
    }

    // useEffect(()=>{
        
    // })

    return (
      <div>
        <Jogador cartas={cartas} soma={soma}/>
        <br/>
        <Dealer fim={fim} cartasDealer={cartasDealer} somaDealer={somaDealer}/>
        <p>Suas fichas: {fichasJogador}</p>
        <p>Sua aposta: {aposta}</p>
        <button onClick={()=>{apostar(5)}}>+5</button>
        <button onClick={()=>{apostar(10)}}>+10</button>
        <button onClick={()=>{apostar(50)}}>+50</button>
        <button onClick={instawin}>Insta win por soma maior</button>
        <br/>
        <button onClick={()=>{apostar(-5)}}>-5</button>
        <button onClick={()=>{apostar(-10)}}>-10</button>
        <button onClick={()=>{apostar(-50)}}>-50</button>
        <br/>
        <br/>
        <button onClick={iniciarPartida}>Iniciar Partida</button>
        <button onClick={pegarNovaCarta}>Pegar carta</button>
        <button onClick={()=>{setFim(true)}}>Finalizar partida</button>
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
