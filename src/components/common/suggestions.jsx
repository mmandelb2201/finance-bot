import React, { useState } from 'react';
import './common.css';


// TODO: add getListing to get all listing information
const SuggestionsBox = (props) => {
   
    let [index, setIndex] = useState(0);

    let incrementIndex = () => {
        if(index + 1 === props.suggestions.length){
            setIndex(0);
        }else{
            setIndex(index + 1);
        }
    }

    return (<div className='suggestions-container'>
                <button onClick={() => incrementIndex()}>Increment</button>
                <p className='suggestions-paragraph'>{ props.suggestions[index] }</p>
            </div>
    );
}

export default SuggestionsBox;