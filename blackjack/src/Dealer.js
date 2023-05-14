export const Dealer = (props) =>{
    return(
        <div className='dealer'>
        {props.fim ? 
            <div>
            <h1>Dealer</h1>
            <p className='p'>Cartas: {props.cartasDealer.join(", ")}</p>
            <p className='p'>Soma: {props.somaDealer}</p>
            </div>
            : <div>
            <h1>Dealer</h1>
            <p className='p'>Cartas: {props.cartasDealer[0]}, ?</p>
            <p className='p'>Soma: ?</p>
            </div>
        }
        </div>
    )
}

