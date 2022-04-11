import Transaction from "./transaction";

class ReoccuringTransaction extends Transaction{
    startDate = new Date();
    period = 0//measured in days. If 0, transaction occurs monthly

    constructor(amount, title, description, date, startDate, period){
        super(amount, title, description, date);
        this.startDate = startDate;
        this.period = period;
    }
}

export default ReoccuringTransaction;