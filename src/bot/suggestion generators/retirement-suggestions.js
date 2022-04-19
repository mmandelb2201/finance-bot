import User from "../../objects/user";
 
class RetirementSuggestor{

    user = new User();

    constructor(user){
        this.user = user;
    }

    getSuggestions(){
        //Array that contains suggestions
        var suggestions = []
        //amount of years until the user reaches retirement age
        year_diff = this.user.retirementAge - this.user.getAge();
        //amount the user should have saved by retirement going by the rule of 25. Not including inflation.
        var retirementTotal = (this.user.income - this.user.calculateMonthlyTotal) * 12 * 25;
        //calcualte retirement total in future value
        var realRetirementTotal = this.caluclateFutueValue(retirementTotal, 0.025, year_diff);
        //total amount the user will have in their account by the time they retire
        var savingsByRetirement = this.calculateCurrentSavingsByRetirement(this.user.retirementAge);
        //Find how much the user will have if they continue saving as they are
        var sWithAWByRetirement = this.calculateCurrentSavingsByRetirement(this.user.retirementAge);
        //check if user currently has enough saved to be retired safely
        if(savingsByRetirement[1] > realRetirementTotal){
            suggestions.push("Great job saving! Even without putting another dollar into your retirement accounts, you have enough saved to be retired for 25 years. But that does not mean you should stop saving!");
        }
        if(sWithAWByRetirement[1] > realRetirementTotal){
            suggestions.push("Great Job! If you keep saving as you are, you will have enough money to safely be retired for 25 years!");
        }else{
            //user is not saving enough. compare their current IRA contribution to the max contribution
            if(sWithAWByRetirement[1] < realRetirementTotal * 0.5){
                suggestions.push("With your current saving habits, you will most likely only have enough money to be safely retired for 12 years. Saving for reirement should be your top priority.");
            }
            //if user makes more than the max amount to contribute to an IRA, no reason in suggesting an IRA
            if(this.user.income * 12 < 214000){
                let limit = this.user.getMaxIRACont();
                //calculate how much the user needs to be saving per month if they want to retire safely
                //to simplify calculations, take average interest between Roth and traditional IRA
                var avgInterest = 0;
                var count = 0;
                for(let account in this.user.retirementBankAccounts){
                    if(account.type == "Roth IRA" || account.type == "Traditional IRA"){
                        avgInterest += account.interest;
                        count += 1;
                    }
                }
                avgInterest = avgInterest/count;   
                let annualDeposit = this.calculateAnnualRequiredSavings(year_diff, savingsByRetirement[0], avgInterest);
                //check if user cannot save enough even with max contributions to both IRA's
                if(annualDeposit > (this.user.getMaxIRACont() * 2)){

                }else if(annualDeposit > (this.user.getMaxIRACont())){
                    //To save enough, the user needs to open a second IRA
                    if(this.user.hasAccount("Roth IRA") && !this.user.hasAccount("Traditional IRA")){
                        let saving = annualDeposit - this.user.getMaxIRACont();
                        suggestions.push(`To be able to retire safely, you need to save more than your max contribution. Consider opening a Traditional IRA as well. Max out your Roth IRA and save at least ${saving} per year in the Traditional IRA`);
                    }else{
                        let saving = annualDeposit - this.user.getMaxIRACont();
                        suggestions.push(`To be able to retire safely, you need to save more than your max contribution. Consider opening a Roth IRA as well. Max out your Traditional IRA and save at least ${saving} per year in the Roth IRA`);
                    }
                }
            }
        }
        
    }
    /**
     * Calculates how much the user will have in their account by the time they retire if they do not change their saving habit
     * @param {number} retirement_age 
     * @returns {[number]} array that contains future balances in retirement accounts. Index 0 does not include inflation, index 1 does include inflation 
     */
    calculateCurrentTrendByRetirement(retirement_age){
        //amount of years until the user reaches retirement age
        year_diff = retirement_age - this.user.getAge();
        //future account balance of retirement accounts not including inflation
        var futureTotalRetirementAccountBalances = 0;
        //run through the user's accounts and save the one's that are retirement accounts 
        for(let account in this.user.retirementBankAccounts){
            futureTotalRetirementAccountBalances = futureTotalRetirementAccountBalances + this.calculateFutureValueWithMonthy(account, year_diff);
        }
        //future account balance of retirement accounts including the effect of inflation
        var futureRealTotalRetirementAccountBalances = this.calculateRealFutureValue(futureTotalRetirementAccountBalances, year_diff);
        return [futureTotalRetirementAccountBalances, futureRealTotalRetirementAccountBalances];
    }
    /**
     * Calcualtes how much the user will have saved in their retirement accounts by the time they reach their retirement age
     * @param {number} retirement_age 
     * @returns {[number]} array that contains future balances in retirement accounts. Index 0 does not include inflation, index 1 does include inflation
     */
    calculateCurrentSavingsByRetirement(retirement_age){
        //amount of years until the user reaches retirement age
        year_diff = retirement_age - this.user.getAge();
        //future account balance of retirement accounts not including inflation
        var futureTotalRetirementAccountBalances = 0;
        for(let account in this.user.retirementBankAccounts){
            futureTotalRetirementAccountBalances = futureTotalRetirementAccountBalances + this.caluclateFutueValue(account.balance, account.interest, year_diff);
        }
        //future account balance of retirement accounts including the effect of inflation
        var futureRealTotalRetirementAccountBalances = this.calculateRealFutureValue(futureTotalRetirementAccountBalances, year_diff);
        return [futureTotalRetirementAccountBalances, futureRealTotalRetirementAccountBalances];
    }
    
    /**
     * Calculates how much the user needs to save per month to be able to retire safely
     * @param {number} periods years until user retires
     * @param {number} currVal current saved balance
     * @param {number} interest interest the account provides
     * @returns {number} annual deposit to IRA accounts required
     */
    calculateAnnualRequiredSavings(periods, currVal, interest){
        let total = this.user.income * 12 * 25;
        let diff = total - currVal;
        if(diff > 0){
            return 0;
        }else{
            return annualPayments = diff*((interest*(1+interest)**periods)/(1+interest)**periods - 1);
        }
    }
    /**
     * Calcualtes the value of an account after periods amount of periods
     * @param {bankACcount} account 
     * @param {number} periods 
     * @returns {number} Future account balance
     */
    caluclateFutueValue(value, interest, periods){
        return value*(1 + interest)**periods;
    }

    /**
     * Calculates how much a value would be in today's dollars. Assumes 2.5% interest
     * @param {number} value 
     * @param {number} periods
     * @returns {number} future value with the effect of inflation after period periods
     */
    calculateRealFutureValue(future_value, periods){
        return future_value*(1.025)**(-periods);
    }

    /**
     * Calculates value of an account after periods amount of periods. Includes monthly contributions into calculation
     * @param {number} account 
     * @param {number} periods
     * @returns {number} Account balance in future worth 
     */
    calculateFutureValueWithMonthy(account, periods){
        var annualWInFW = (account.monthyContribution*12) * ((((1+account.interest)**periods)-1)/account.interest);
        var currBalanceInFW = this.caluclateFutueValue(account.balance, account.interest, periods);
        return annualWInFW + currBalanceInFW;
    }
}

export default RetirementSuggestor;