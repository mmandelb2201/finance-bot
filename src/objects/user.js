import Transaction from "./reoccuringTransaction";
import ReoccuringTransaction from "./reoccuringTransaction";
import BankAccount from "./bankAccount";

class User {
    name = "";
    email = "";
    income = 0;
    monthyTransactions = [new Transaction()];
    monthyReoccuringTransactions = [new ReoccuringTransaction()];
    bankAccounts = [new BankAccount()];
    totalSpending = 0;

    constructor(email, name, income, monthyTransactions, bankAccounts, monthyReoccuringTransactions){
        this.email = email;
        this.name = name;
        this.income = income;
        this.monthyTransactions = monthyTransactions;
        this.monthyReoccuringTransactions = monthyReoccuringTransactions;
        this.bankAccounts = bankAccounts;
        this.totalSpending = this.calculateMonthlyTotal();
    }

    /**
     * Calculates the total gain or loss the user takes in each month based on income and monthy transactions.
     * @returns {number} balance
     */
    claculateMonthlyTotal(){
        var total = this.income;
        for (let transaction in this.monthyTransactions){
            total = total - transaction.amount;
        }
        for (let transaction in this.monthyReoccuringTransactions){
            total = total - this.calculateReoccurMonthlyTotal(transaction);
        }
        return total;
    }

    /**
     * Takes a reoccuring transaction obejct and returns how much that totals over the current month
     * @param {ReoccuringTransaction} reoccurTrans 
     * @returns {number} monthy cost of reoccuring transaction
     */
    calculateReoccurMonthlyTotal(reoccurTrans){
        const sDate = reoccurTrans.startDate.getTime();
        const date = new Date();
        const firstDayOfMonth = this.getFirstDayOfMonth(date.getFullYear(), date.getMonth()).getTime();
        const lastDayOfMonth = this.getLastDayOfMonth(date.getFullYear(), date.getMonth()).getTime();
        const periodInMillSec = reoccurTrans.period * 86400000; //need to convert period in days to milliseconds
        var currStart = sDate;

        while(currStart < firstDayOfMonth){
            currStart += periodInMillSec;
        }

        if(currStart > lastDayOfMonth){
            return 0;
        }else{
            var amtTransactions = (lastDayOfMonth - firstDayOfMonth)/periodInMillSec;
            return reoccurTrans.amount * amtTransactions;
        }
    }

    /**
     * Returns a date object corresponding to the first day of the month
     * @param {year} year 
     * @param {month} month 
     * @returns {Date} first date of month
     */
    getFirstDayOfMonth(year, month){
        return new Date(year, month, 1);
    }
    
    /**
     * Returns a date object corresponding to the last day of the month
     * @param {year} year 
     * @param {month} month 
     * @returns {Date} last date of month
     */
    getLastDayOfMonth(year, month){
        return new Date(year, month + 1, 0);
    }
}

export default User;