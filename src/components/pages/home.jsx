import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./pages.css";
import BankAccount from "../../objects/bankAccount";
import RetirementBankAccount from "../../objects/retirementBankAccount";
import Transaction from "../../objects/transaction";
import User from "../../objects/user";
import SuggestionsBox from "../common/suggestions"
import Chart from "./chart"
import Accounts from "./accounts"

const Home = () => {



  let u = new User("f", "", 1000,[new Transaction(100, "Rent", "Rent", Date.now())], [new BankAccount(100, 0.3, [new Transaction(100, "Groceries", "Groceries", Date.now())], "Checking")], [new RetirementBankAccount(100, 0.2, [new Transaction(100, "Groceries", "Groceries", Date.now())], "401K", 50, 50)],  [], 60, Date.now());
  let spendingSugs = u.getSpendingSuggestions();
  let accountSugs = u.getAccountSuggestions();
  let retireSugs = u.getRetirementSuggestions();

  var totalSugs = [...spendingSugs, ...accountSugs, ...retireSugs];
  

  return (<Container fluid>
    <Row>
      <Col><Accounts accounts={[...u.bankAccounts, ...u.retirementBankAccounts]}/></Col>
      <Col><Chart wantsSpending={u.wantsSpending} needsSpending={u.needsSpending} savingsSpending={u.savingsSpending} /></Col>
      <Col><SuggestionsBox suggestions={totalSugs}></SuggestionsBox></Col>
    </Row>
  </Container>
  );
};

export default Home;
