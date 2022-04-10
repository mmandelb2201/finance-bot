import User from "../../objects/user";
import ReoccuringTransaction from "../../objects/reoccuringTransaction";
import Transaction from "../../objects/transaction";

class SpendingSuggestor{
    user = new User();
    totalSpending = 0;
    needs = 0; //total monthly speding for needs
    wants = 0; //total monthy spending for wants
    savings = 0; //total monthy put into savings

    constructor(user){
        this.user = user;
        this.totalSpending = user.totalSpending;
    }

    getSuggestions(){
        //Sort transactions into wants, needs, savings
        //First, sort into wants and needs
        this.sortTransactions()
        //Leftover amount will be assumed to go into savings
        this.savings = this.user.income - this.wants - this.needs;
        //calculate percentage of income that goes to each category
        let wantsPercentage = this.wants/this.user.income;
        let needsPercentage = this.needs/this.user.income;
        let savingsPercentage = this.savings/this.user.income;
    }

    /**
     * Runs through user transactions and sorts them into wants and needs
     */
    sortTransactions(){
        for(let transaction in this.user.monthyTransactions){
            switch(transaction.type){
                case "Rent": case "Groceries": case "Utilities":
                    this.needs += transaction.amount;
                    break;
                case "Entertainment": case "Clothing": case "Restaurant":
                    this.wants += transaction.amount;
                    break;
                default:
                    this.wants += transaction.amount;
                    break; 
            }
        }
        for(let transaction in this.user.monthyReoccuringTransactions){
            let amt = this.user.calculateReoccurMonthlyTotal(transaction.amount);
            switch(transaction.type){
                case "Rent": case "Groceries": case "Utilities":
                    this.needs += amt;
                    break;
                case "Entertainment": case "Clothing": case "Restaurant":
                    this.wants += amt;
                    break;
                default:
                    this.wants += amt;
                    break; 
            }
        }
    }
}

export default SpendingSuggestor;