import User from "../../objects/user";
 
class RetirementSuggestor{

    user = new User();

    constructor(user){
        this.user = user;
    }

    getSuggestions(){
        //Array that contains suggestions
        var suggestions = []

    }

    /**
     * Calcualtes how much the user will have saved in their retirement accounts by the time they reach their retirement age
     * @param {number} retirement_age 
     * @returns {[number]} array that contains future balances in retirement accounts. Index 0 does not include inflation, index 1 does include inflation
     */
    calculateCurrentSavingsByRetirement(retirement_age){
        //amount of years until the user reaches retirement age
        year_diff = retirement_age - this.user.getAge();
        //array that holds onto the user's retirement accounts
        var retirementAccounts = [];
        //future account balance of retirement accounts not including inflation
        var futureTotalRetirementAccountBalances = 0;
        //run through the user's accounts and save the one's that are retirement accounts 
        for(let account in this.user.bankAccounts){
            if(account.type === "Roth IRA" || account.type === "Traditional IRA" || account.type === "401K"){
                retirementAccounts.push(account);
                futureTotalRetirementAccountBalances = futureTotalRetirementAccountBalances + this.caluclateFutueValue(account, year_diff);
            }
        }
        //future account balance of retirement accounts including the effect of inflation
        var futureRealTotalRetirementAccountBalances = this.calculateRealFutureValue(futureTotalRetirementAccountBalances, year_diff);
        return [futureTotalRetirementAccountBalances, futureRealTotalRetirementAccountBalances];
    }
    /**
     * Calcualtes the value of an account after periods amount of periods
     * @param {bankACcount} account 
     * @param {number} periods 
     * @returns {number} Future account balance
     */
    caluclateFutueValue(account, periods){
        return account.balance*(1 + account.interest)**periods;
    }

    /**
     * Calculates how much a value would be in today's dollars. Assumes 2.5% interest
     * @param {*} value 
     * @param {*} periods 
     */
    calculateRealFutureValue(value, periods){
        return value*(1.025)**(-periods);
    }
}

export default RetirementSuggestor;