import React from 'react';
import './suggestions.css';


// TODO: add getListing to get all listing information
const SuggestionsBox = ( props ) => {
   
    return (<a className="link">
            <div className='preview-container'>
                <p className='preview-paragraph'>{ props.suggestion }</p>
            </div>
        </a>
    );
}

export default SuggestionsBox;