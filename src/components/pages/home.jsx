import React, { useState } from "react";
import Chart from "../../dist/donut";
import "./pages.css";
import BankAccount from "../../objects/bankAccount";
import ReoccuringTransaction from "../../objects/reoccuringTransaction";
import RetirementBankAccount from "../../objects/retirementBankAccount";
import Transaction from "../../objects/transaction";
import User from "../../objects/user";
import SuggestionsBox from "../common/suggestions/suggestions"
import AccountsSuggestor from "../../bot/suggestion generators/accounts-suggestions";
import SpendingSuggestor from "../../bot/suggestion generators/spending-suggestions";
import RetirementSuggestor from "../../bot/suggestion generators/retirement-suggestions";

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

const Home = () => {

  let u = new User("f", "", 1000,[new Transaction(100, "Rent", "Rent", new Date())], [new BankAccount(100, 0.3, [new Transaction(100, "Groceries", "Groceries", new Date())], "Checking")], [new RetirementBankAccount(100, 0.2, [new Transaction(100, "Groceries", "Groceries", new Date())], "401K", 50, 50)],  [], 60, 2, 3, new Date());
  let spendingSugs = u.getSpendingSuggestions();
  let accountSugs = u.getAccountSuggestions();
  let retireSugs = u.getRetirementSuggestions();
  var totalSugs = [];
  console.log(totalSugs);
  totalSugs.concat(spendingSugs, accountSugs, retireSugs);
  // Preparing the chart data
const chartData = [
  {
    label: "Wants",
    value: `${u.wantsSpending}`
  },
  {
    label: "Needs",
    value: `${u.needsSpending}`
  },
  {
    label: "Savings",
    value: `${u.savingsSpending}`
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
      caption: "Monthly Spending Breakdown",    //Set the chart caption
      numberSuffix: "K",
      theme: "fusion" //Set the theme for your chart
    },
    // Chart Data - from step 2
    data: chartData
  }
};

  return (
    <div className="background">
      <div className="row">
        <div className="col" id="preview-container-end">
          Account Balances{" "}
        </div>{" "}
        <div className="col" id="preview-container-center">
            <ReactFC {...chartConfigs} />
        </div>{" "}
        <div className="col" id="preview-container-end">
          Suggestion{" "}
            <SuggestionsBox suggestion={spendingSugs.join(".")+ accountSugs.join(".") + retireSugs.join(".")}></SuggestionsBox>
        </div>{" "}
      </div>{" "}
      <br />
      <br />
    </div>
  );
};

export default Home;
