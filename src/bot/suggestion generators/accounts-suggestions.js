import User from "../../objects/user";
 
class AccountsSuggestor{

    user = new User();

    constructor(user){
        this.user = user;
    }

    getSuggestions(){
        //changes number to current format
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'usd'
        });
        //Array that contains suggestions
        var suggestions = [];
        let currBal = this.totalSaved();
        if(currBal > this.user.income * 6){
            suggestions.push("Great job! You have enough saved for a good emergency fund! But don't stop saving!");
        }else if(currBal > this.user.income > 3){
            suggestions.push("Nice job saving! You have a decent amount saved! However, you should aim to have an emergency fund of at least 6 months pay");
        }else{
            suggestions.push("It's reccomended to have 3-6 months worth of monthly income saved in an emergency fund.");
        }
        return suggestions;
    }

    /**
     * Calculates the total the user has saved in non-retirement accounts
     * @returns {number} total balance saved
     */
    totalSaved(){
        total = 0;
        for(let account in this.user.bankAccounts){
            if(account.type != "Roth IRA" && account.type != "Traditional IRA" && account.type != "401K"){
                total += account.balance;
            }
        }
        return total;
    }


}
export default AccountsSuggestor;