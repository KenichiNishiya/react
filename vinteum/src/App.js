//TODO 
// resolver soma
// colocar as cartas em arrays
// botao de pegar nova carta
// botao de finalizar a partida
// usar emJogo e tem21

// TODO OPTIONAL
// sistema de apostas
// dealer pode pegar nova carta
// cartas representam as letras quando pertinente

import './App.css';
import {useState} from 'react';
import {useEffect} from 'react';

function App() {
const [emJogo,setEmJogo] = useState(false);

const [primeiraCarta,setPrimeiraCarta] = useState(0);
const [segundaCarta,setSegundaCarta] = useState(0);
const [somaCartas,setSomaCartas] = useState(0);

const [primeiraCartaDealer,setPrimeiraCartaDealer] = useState(0);
const [segundaCartaDealer,setSegundaCartaDealer] = useState(0);
const [somaCartasDealer,setSomaCartasDealer] = useState(0);

const [resultado,setResultado] = useState("");

    useEffect(() =>{
        console.log("soma",somaCartas);
        console.log("dealer",somaCartasDealer);
        // setSomaCartas(somaCartas);
        // setSomaCartasDealer(somaCartasDealer);
    },[somaCartas,somaCartasDealer]);

    const iniciarPartida = () =>{
        setPrimeiraCarta(randomCard());
        setSegundaCarta(randomCard());
        
        setPrimeiraCartaDealer(randomCard());
        setSegundaCartaDealer(randomCard());

        setEmJogo(true);
        somarCartas();
    }

    const finalizar = () =>{
        somarCartas();
        console.log("finalizar function",somaCartas,somaCartasDealer)
        compararSomas();
    }

    const compararSomas = () =>{
        // As somas ficam = 0
        if(somaCartasDealer > somaCartas){
            console.log(somaCartasDealer,somaCartas,"perdeu");
        }
        else{
            console.log(somaCartasDealer,somaCartas,"ganhou");
        }

    }

    const somarCartas = () =>{
        // soma nao recebe valor
        // somente depois de apertar 2 vezes ele pega o valor
        // mas e o valor anterior
        setSomaCartas(primeiraCarta+segundaCarta);
        setSomaCartasDealer(primeiraCartaDealer+segundaCartaDealer);
    }

const [tem21,setTem21] = useState(false);
const somaTem21 = () =>{
    setTem21(true);
}

  return (
    <div className="App">
      {emJogo && console.log("em jogo")}
      {tem21 && console.log("tem o 21")}
      <button onClick={iniciarPartida}>Iniciar jogo</button>
      <button onClick={finalizar}>Finalizar</button>
      <button onClick={somaTem21}>21 instantaneo</button>
      <br/>
      <CartasJogador primeira={primeiraCarta} segunda={segundaCarta}/>
      <p>{somaCartas}</p>
      <CartasDealer primeira={primeiraCartaDealer} segunda={segundaCartaDealer} />
      <p>{somaCartasDealer}</p>
      {somaCartas > somaCartasDealer ?? <p>{resultado}</p>}
      <br/>
    </div>
  );

}

// const Jogador = () =>{
//     let jogador = [primeiraCarta,segundaCarta]
//     return jogador[0] + " " + jogador[1];
// }

const CartasJogador = (props) => {
    return(
        <div>
        <p>Suas cartas: {props.primeira} e {props.segunda}</p>
        </div>
    );
};

const CartasDealer = (props) => {
    return(
        <div>
        <p>Cartas do dealer: {props.primeira} e {props.segunda}</p>
        </div>
    );
};

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

export default App;
