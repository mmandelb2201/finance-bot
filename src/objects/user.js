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
    dateOfBirth = new Date();
    martialStatus = "";
    nChildren = 0;
    nDependentChildren = 0;

    // ERROR MAX-PARAMS - MAX IS 3
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

    calculateMonthlyTotal(){
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
        //Check if period is 0. If so, the transaction happens monthly, so only return amount.
        if(reoccurTrans.period === 0){

            //Check date bought. If current day of month is past initial transaction day during the month. Apply transaction
            const date = new Date();

            if(date.getDay() >= reoccurTrans.startDate.getDay()){
                return reoccurTrans.amount;
            }

            else if((this.getLastDayOfMonth(date.getFullYear(), date.getMonth()).getDay() < reoccurTrans.getDay()) && (date == this.getLastDayOfMonth(date.getFullYear(), date.getMonth()))){
                //Day bought on doesn't occur in current month. Apply transaction on last day of month
                //For example If subscription is purchased on Jan 30, Feb 30 does not exist. Therefore
                //the transaction should be accounted for on the last day of Feb.
                return reoccurTrans.amount;
            }

            else{
                //Transaction has not been applied at current point.
                return 0;
            }
        }else{
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