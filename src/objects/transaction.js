class Transaction{
    amount = 0.0;
    title = "";
    description = "";
    date = new Date();
    type = "";

    constructor(amount, title, description, date, type){
        this.amount = amount;
        this.title = title;
        this.description = description;
        this.date = date;
        this.type = type;
    }
}

export default Transaction;