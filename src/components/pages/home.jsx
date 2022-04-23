import React, { useState } from "react";

function Home() {

  const ManyInputs = ({howMany}) => {
    // Like ["", "", ""]
    const [inputs, setInputs] = useState(Array.from(new Array(howMany)).map(_ => ""));
  
  const handleUserInputChange = position => (e) => {
    // Update the correct input state
    setInputs(...inputs.slice(0, position), e.target.value, ...inputs.slice(position+1));
  };
  
  return <>
    {inputs.map((text, i) => <input 
    value={text}
     onChange={handleUserInputChange(i)}>
     </input>}
  </>;
  };
  
};

export default Home;
