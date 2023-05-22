import './App.css';
function App() {
    const handleClick = () => {
        window.location.href = 'https://blackjack-59158.web.app';
    };
return (
<div className="App">
<header className="App-header">
<h1 style={{color:"goldenrod", borderBlockStyle: "dashed",
borderBlockStartColor: "black", borderBlockEndColor: "red"}}>
Bem vindo ao BlackJack
</h1>
<h2 style={{color: "goldenrod", borderBlockEndStyle: "groove",
borderBlockEndColor:"goldenrod"}}>Regras:
</h2>
<ul>
<li>O jogo BlackJack, também conhecido como 21, consiste em
um jogo onde o jogador deve
sempre ficar com 2 ou mais cartas na mão.
</li>
<br></br>
<li>Durante cada rodada o jogador deve escolher entre "pedir
mais uma carta" ou "parar de jogar".
</li>
<br></br>
<li>Para o jogador ganhar, ele deve ter a soma de suas cartas
maior que a soma das cartas do "dealer",
caso a soma das cartas de alguem ultrapasse 21, ele perde
automaticamente.
</li>
<br></br>
<li>Caso ambos tenham ultrapassado 21, haverá um empate</li>
<br></br>
<li>Caso o dealer e o jogador possuam a mesma soma, haverá um empate.
</li>
<br></br>
<li>Caso o jogador ganhe sem o resultado sendo 21, ele ganha
o dobro das fichas apostadas.</li>
<br></br>
<li>Caso ganhe com o resultado sendo 21 na soma, ele ganha o
triplo das fichas apostadas.</li>
<br></br>
<br></br>
</ul>
<p className="p" style={{color:
"red"}}>---------------------------------------------------------------
-----------------------------------------------------------------------
-------------</p>
<h2 style={{color: "goldenrod", borderBlockEndStyle: "groove",
borderBlockEndColor: "goldenrod"}}>Cartas:</h2>
<ul>
<li>As cartas disponíveis:
Ás, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K.
</li>
<br></br>
<li>Ordem de menor para maior. O "Ás" vale 1 enquanto as
letras "J","Q","K" valem 10.
</li>
<br></br>
<li>O "Ás" pode variar de valor, caso o jogador não tenha ultrapassado a soma de 21, o Ás vale 11, caso contrário ele vale 1.
</li>
<br></br>
</ul>
</header>
    <button onClick={handleClick} style={{"padding":"10px","margin-bottom":"30px","background-color":"#0c3809","border-style":"solid","border-size":"10px","border-width":"4px","border-color":"goldenrod","color":"goldenrod","font-weight":"bolder","font-size":"30px"}}>IR PARA O JOGO</button>
</div>
);
}
export default App;
