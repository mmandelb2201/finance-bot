import React, { useState } from "react";
import BankAccount from "../../objects/bankAccount";
import ReoccuringTransaction from "../../objects/reoccuringTransaction";
import RetirementBankAccount from "../../objects/retirementBankAccount";
import Transaction from "../../objects/transaction";
import User from "../../objects/user";

let u = new User("f", "", 1000000,[new Transaction(100, "Rent", "Rent", new Date())], [new BankAccount(100, 0.3, [new Transaction(100, "Groceries", "Groceries", new Date())], "Checking")], [new RetirementBankAccount(100, 0.2, [new Transaction(100, "Groceries", "Groceries", new Date())], "401K", 50, 50)],  [], 60, 2, 3, new Date());


const Home = () => {

  console.log(u.getAccountSuggestions());
  console.log(u.getRetirementSuggestions());
  console.log(u.getSpendingSuggestions());
  return <h1>{u.dateOfBirth.getTime()}</h1>;
};

export default Home;
