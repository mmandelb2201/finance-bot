import React, { useState } from "react";
import Chart from "../../dist/donut";
import "./pages.css";

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
    </div>
  );
};

export default Home;
