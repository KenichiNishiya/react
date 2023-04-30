import React, {useEffect} from 'react';
import {useState} from 'react';

export const Text = () =>{
    const [text,setText] = useState("");
    // Whenever the Text component re-renders, the useEffect will run
    // Since we are updating the input text, it also run it
    useEffect(() =>{
        console.log("Mounted");

        return () =>{
            console.log("Unmounted");
        };
    },[text]);
    // You can ommit the ,[text] or leave it as is if you want the
    // effect to run everytime it is updated
    // If you want to run only when mounting, leave the array empty [].
    return(
        <div>
            <input onChange={(event) =>{setText(event.target.value)}}/>
            <h1>{text}</h1>
        </div>
    );
}

