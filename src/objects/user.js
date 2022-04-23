import Transaction from "./reoccuringTransaction";
import ReoccuringTransaction from "./reoccuringTransaction";
import BankAccount from "./bankAccount";
import RetirementBankAccount from "./retirementBankAccount";
 
class User {
    name = "";
    email = "";
    income = 0;
    debtPayback = 0;
    monthyTransactions = [new Transaction()];
    monthyReoccuringTransactions = [new ReoccuringTransaction()];
    bankAccounts = [new BankAccount()];
    retirementBankAccounts = [new RetirementBankAccount()];
    totalSpending = 0;
    dateOfBirth = new Date();
    nChildren = 0;
    nChildrenCollege = 0;
    retirementAge = 0;

    constructor(email, name, income, debtPayback,monthyTransactions, bankAccounts, retirementBankAccounts,monthyReoccuringTransactions, retirementAge, nChildren, nChildrenCollege){
        this.email = email;
        this.name = name;
        this.income = income;
        this.debtPayback = debtPayback;
        this.monthyTransactions = monthyTransactions;
        this.retirementBankAccounts = retirementBankAccounts;
        this.monthyReoccuringTransactions = monthyReoccuringTransactions;
        this.bankAccounts = bankAccounts;
        this.retirementAge = retirementAge;
        this.nChildren = nChildren;
        this.nChildrenCollege = nChildrenCollege;
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

    /**
     * Caluclates the user's age from their date of birth
     * @returns {number} age
     */
    getAge(){
        var month_diff = Date.now() - this.dateOfBirth.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        return Math.abs(year - 1970);
    }

    /**
     * Returns the max annual 401K contribution for the user
     * @returns {number} 
     */
    getMax401KCont(){
        if(this.getAge() >= 50){
            return 27000;
        }else{
            return 20500;
        }
    }

    /**
     * Returns the max annual IRA contribution for the user
     * @returns 
     */
    getMaxIRACont(){
        let total = 0;
        //limit yearly income for max Roth IRA contribution is 204,000 per year
        if(this.income * 12 < 204000){
            if(this.getAge() >= 50){
                total = 7000;
            }else{
                total = 6000;
            }
        //if person makes between $204,000 and $214,000 they can contribute a reduced amount
        }else if(this.income * 12 < 214000){
            total = this.income * 12 - 125000;
            total = total/15;
            if(this.getAge() >= 50){
                total = total * 7000;
                total = 7000 - total;
            }else{
                total = total * 6000;
            total = 6000 - total;
            }
        }
        return total;
    }
    /**
     * Check if user has a type of a bank of account currently open.
     * @param {String} type 
     * @returns {Boolean}
     */
    hasAccount(type){
        if(type === "401K" || type === "Roth IRA" || type === "Traditional IRA"){
            for(let account in this.retirementBankAccounts){
                if(account.type === type){
                    return true;
                }
            }
        }else{
            for(let account in this.bankAccounts){
                if(account.type === type){
                    return true;
                }
            }
        }
        return false;
    }
}
 
export default User;