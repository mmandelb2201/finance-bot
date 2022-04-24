import React, { useState } from "react";
import Chart from "../../dist/donut";
import "./pages.css";
import BankAccount from "../../objects/bankAccount";
import ReoccuringTransaction from "../../objects/reoccuringTransaction";
import RetirementBankAccount from "../../objects/retirementBankAccount";
import Transaction from "../../objects/transaction";
import User from "../../objects/user";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Column2D from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

let u = new User("f", "", 1000000,[new Transaction(100, "Rent", "Rent", new Date())], [new BankAccount(100, 0.3, [new Transaction(100, "Groceries", "Groceries", new Date())], "Checking")], [new RetirementBankAccount(100, 0.2, [new Transaction(100, "Groceries", "Groceries", new Date())], "401K", 50, 50)],  [], 60, 2, 3, new Date());


const Home = () => {

  console.log(u.getAccountSuggestions());
  console.log(u.getRetirementSuggestions());
  console.log(u.getSpendingSuggestions());

  // Preparing the chart data
const chartData = [
  {
    label: "Wants",
    value: "290"
  },
  {
    label: "Needs",
    value: "260"
  },
  {
    label: "Savings",
    value: "250"
  }
];

// Create a JSON object to store the chart configurations
const chartConfigs = {
  type: "pie2d", // The chart type
  width: "700", // Width of the chart
  height: "400", // Height of the chart
  dataFormat: "json", // Data type
  dataSource: {
    // Chart Configuration
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",    //Set the chart caption
      subCaption: "In MMbbl = One Million barrels",             //Set the chart subcaption
      xAxisName: "Country",           //Set the x-axis name
      yAxisName: "Reserves (MMbbl)",  //Set the y-axis name
      numberSuffix: "K",
      theme: "fusion"                 //Set the theme for your chart
    },
    // Chart Data - from step 2
    data: chartData
  }
};

  return (
    <div className="background">
      <div className="row">
        <div className="column" id="preview-container-end">
          <br />
          Account Balances{" "}
        </div>{" "}
        <div className="column" id="preview-container-center">
            <ReactFC {...chartConfigs} />
        </div>{" "}
        <div className="column" id="preview-container-end">
          <br />
          Suggestion{" "}
          <SuggestionsBox suggestion="Please have your daily penis inspection"></SuggestionsBox>
        </div>{" "}
      </div>{" "}
      <br />
      <br />
    </div>
  );
};

export default Home;
