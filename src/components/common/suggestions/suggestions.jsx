import React from 'react';
import './suggestions.css';


// TODO: add getListing to get all listing information
const SuggestionsBox = ({ suggestions }) => {
   
    return (<a className="link" href={"/view-item/" + id}>
            <div className='preview-container'>
                <p className='preview-paragraph'>{ suggestions }</p>
            </div>
        </a>
    );
}

export default SuggestionsBox;