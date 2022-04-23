import React, { useState } from "react";
import Chart from "../../dist/donut";
import "./pages.css";

<<<<<<< HEAD
const Home = () => {
  return (
    <div className="background">
      <div className="row">
        <div className="column" id="preview-container-end">
          <br />
          Account Balances{" "}
        </div>{" "}
        <div className="column" id="preview-container-center">
          DATA VIS
        </div>{" "}
        <div className="column" id="preview-container-end">
          <br />
          Suggestion{" "}
        </div>{" "}
      </div>{" "}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
=======
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
  
>>>>>>> 572088574c0b8ce60984aec2e46527ef3e4cf91c
};

=======
  return <h1>Homo SAPIENS</h1>
}
>>>>>>> 59c61be51a168d0da006697da5447692914abaa1
export default Home;
