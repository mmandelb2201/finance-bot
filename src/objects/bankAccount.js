class BankAccount {
    type="";
    balance=0.0;
    transactionHistory = [];
    interest = 0.0;

    constructor(balance, interest, transactionHistory, type){
        this.type = type;
        this.balance = balance;
        this.transactionHistory = transactionHistory;
        this.interest = interest;
    }
}

export default BankAccount