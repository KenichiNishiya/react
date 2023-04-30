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

// let primeiraCarta = 0;
// let segundaCarta = 0;

function App() {
const [emJogo,setEmJogo] = useState(false);

const [primeiraCarta,setPrimeiraCarta] = useState(0);
const [segundaCarta,setSegundaCarta] = useState(0);
const [somaCartas,setSomaCartas] = useState(0);

const [primeiraCartaDealer,setPrimeiraCartaDealer] = useState(0);
const [segundaCartaDealer,setSegundaCartaDealer] = useState(0);
const [somaCartasDealer,setSomaCartasDealer] = useState(0);

    const iniciarPartida = () =>{
        setPrimeiraCarta(randomCard());
        setSegundaCarta(randomCard());
        
        setPrimeiraCartaDealer(randomCard());
        setSegundaCartaDealer(randomCard());

        somarCartas();
        setEmJogo(true);
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
// const jogador = [];

// function drawAnotherCard(){
//     let newCard = randomCard()
//     jogador.push(newCard)
// }

// const [somaJogador,setSomaJogador] = useState(0);
// const somaCartasJogador = (props) => {
//     {props.primeiraCarta + props.segundaCarta}
// }


// const [somaDealer,setSomaDealer] = useState(0);

  return (
    <div className="App">
      {emJogo && console.log("em jogo")}
      {tem21 && console.log("tem o 21")}
      <button onClick={iniciarPartida}>Jogar</button>
      <button onClick={somaTem21}>21 instantaneo</button>
      <br/>
      <CartasJogador primeira={primeiraCarta} segunda={segundaCarta}/>
      <CartasDealer primeira={primeiraCartaDealer} segunda={segundaCartaDealer}/>
      {primeiraCarta+segundaCarta > primeiraCartaDealer + segundaCartaDealer ? <p>Venceu</p> : <p>Perdeu</p>}
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
        <p>Soma: {props.primeira+props.segunda}</p>
        </div>
    );
};

const CartasDealer = (props) => {
    return(
        <div>
        <p>Cartas do dealer: {props.primeira} e {props.segunda}</p>
        <p>Soma do dealer: {props.primeira+props.segunda}</p>
        </div>
    );
};

// const SomaJogador = (props) =>{
//     return <p>{props.primeiraCarta + props.segundaCarta}</p>
// }

// const CartasDealer = (props) => {
//     return(
//         <div>
//         <p>Cartas do Dealer:</p>
//         <p>{props.primeiraCartaDealer}</p>
//         <p>{props.segundaCartaDealer}</p>
//         </div>
//     );
// };

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
