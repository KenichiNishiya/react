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

// const [primeiraCarta,setPrimeiraCarta] = useState(0);
// const [segundaCarta,setSegundaCarta] = useState(0);
// const [somaCartas,setSomaCartas] = useState(0);
const [cartas,setCartas] = useState([]);
const [somaArray,setSomaArray] = useState(0)

// const [primeiraCartaDealer,setPrimeiraCartaDealer] = useState(0);
// const [segundaCartaDealer,setSegundaCartaDealer] = useState(0);
// const [somaCartasDealer,setSomaCartasDealer] = useState(0);
const [cartasDealer,setCartasDealer] = useState([]);
const [somaArrayDealer,setSomaArrayDealer] = useState(0)

const [resultado,setResultado] = useState("");
const [final,setFinal] = useState(false);

    useEffect(() =>{
        console.log("CHANGED")
        // console.log("Suas cartas hook",cartas)
        // console.log("Resultado",resultado)
        setCartas(cartas);
        setCartasDealer(cartasDealer);
        setResultado(resultado);
        setSomaArray(cartas.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
        // setSomaArray(somaArray);
        setFinal(final)
        console.log("final",final);
        console.log("resultado",resultado);
    },[cartas,cartasDealer,resultado,somaArray,final]);

    const iniciarPartida = () =>{
        setCartas([randomCard(),randomCard()])
        setCartasDealer([randomCard(),randomCard()])
        // setPrimeiraCarta(randomCard());
        // setSegundaCarta(randomCard());
        // console.log("cartas:",cartas)
        
        // setPrimeiraCartaDealer(randomCard());
        // setSegundaCartaDealer(randomCard());

        setEmJogo(true);
        setResultado("");
        // somarCartas();
    }

    const finalizar = () =>{
        // somarCartas();
        // console.log("finalizar function",somaCartas,somaCartasDealer)
        setFinal(true);
        compararSomas();
    }


    const pegarCarta = () =>{
        let novaCarta = randomCard();
        // console.log("novaCarta:",novaCarta)
        let novaArray = [...cartas,novaCarta];
        setCartas(novaArray);
        // console.log("novaArray:",novaArray)
        
        let somaArrayTemp = 0

        for(let i=0;i<cartas.length;i++){
            somaArrayTemp += cartas[i];
        }
        // console.log("AASDDSA",somaArrayTemp);
        // setSomaArray(somaArrayTemp);
        // console.log("somaarrayda",somaArray)

    }

    const compararSomas = () =>{
        // As somas ficam = 0
        let somaArray = 0
        let somaArrayDealer = 0
        for(let i=0;i<cartas.length;i++){
            somaArray += cartas[i];

        }

        for(let i=0;i<cartasDealer.length;i++){
            somaArrayDealer += cartasDealer[i];
        }
        // console.log("novo soma array dealer",somaArrayDealer)
        // let soma=primeiraCarta+segundaCarta;
        // let somaDealer=primeiraCartaDealer+segundaCartaDealer;

        if(final === true){
            if(somaArray < 21){
                if(somaArray>somaArrayDealer){
                    setResultado("Ganhou")
                }
                else{
                    setResultado("Perdeu")
                }
            }
            else if(somaArray === 21 && somaArrayDealer < somaArray){
                setResultado("VINTE UM")
            }
            else if(somaArray === 21 && somaArrayDealer === 21){
                setResultado("Empate");
            }
        }
        if(final === false && somaArray > 21){
            setResultado("Perdeu, ultrapassou 21")
        }
        // console.log("Comparar")
    }

    // const somarCartas = () =>{
        // soma nao recebe valor
        // somente depois de apertar 2 vezes ele pega o valor
        // mas e o valor anterior
        // setSomaCartas(primeiraCarta+segundaCarta);
        // setSomaCartasDealer(primeiraCartaDealer+segundaCartaDealer);
    // }

  return (
    <div className="App">
      <button onClick={iniciarPartida}>Iniciar jogo</button>
      <button onClick={finalizar}>Finalizar</button>
      <button onClick={pegarCarta}>Pegar mais uma carta</button>
      <br/>
      <CartasJogador cartas={cartas}/>
      <br/>
      <CartasDealer primeira={cartasDealer[0]} segunda={cartasDealer[1]} />
      <br/>
      {resultado !== "" && <p>{resultado}</p>}
    </div>
  );

}

const CartasJogador = (props) => {
    return(
        <div>
        <p>Suas Cartas: {props.cartas.join(" ")}</p>
        </div>
    );
};

const CartasDealer = (props) => {
    return(
        <div>
        <p>Cartas do dealer: {props.primeira} {props.segunda}</p>
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
