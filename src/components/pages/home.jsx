import React, { useState } from "react";

function Home() {
<<<<<<< HEAD

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

=======
  return <h1>Homo SAPIENS</h1>
}
>>>>>>> 59c61be51a168d0da006697da5447692914abaa1
export default Home;
