class Transaction{
    amount = 0.0;
    title = "";
    description = "";

    constructor(amount, title, description, date){
        this.amount = amount;
        this.title = title;
        this.description = description;
        this.date = date;
    }
}

export default Transaction;