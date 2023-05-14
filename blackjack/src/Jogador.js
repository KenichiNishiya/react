export const Jogador = (props) =>{
    return(
        <div className='jogador'>
            <h1>Jogador</h1>
            <p className='p'>Cartas: {props.cartas.join(", ")}</p>
            <p className='p'>Soma: {props.soma}</p>
        </div>
    )
}

