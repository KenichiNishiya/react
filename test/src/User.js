// In order to use this component in the main file, we must export it
export const User = (props) =>{
    return(
        <div>
            {props.name} {props.age}
        </div>
    );
};

