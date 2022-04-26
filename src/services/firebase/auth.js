import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import BankAccount from "../../objects/bankAccount";
import User from "../../objects/user";
import { Transaction } from "firebase/firestore";
import { auth, db } from "./config";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

const userConverter = {
    toFirestore: (user) => {
        const convertTransaction = (transaction) => {
            let t = { ...transaction };
            t.date = Timestamp.fromDate(t.date);
            return t;
        };
        return {
            monthyTransactions: user.monthyTransactions.map( mTransaction => {
                return convertTransaction(mTransaction);
            }),
            bankAccounts: user.bankAccounts.map(bnkAccount => {
                let bnk = { ...bnkAccount };
                bnk.transactionHistory = bnk.transactionHistory.map( tr => {
                    return convertTransaction(tr);
                });
            }),
            retirementBankAccounts: user.retirementBankAccounts.map(rBnkAccount => {
                let bnk = { ...rBnkAccount };
                bnk.transactionHistory = bnk.transactionHistory.map( tr => {
                    return convertTransaction(tr);
                });
            }),
            dOB: Timestamp.fromDate(user.dateOfBirth),
            name: user.name,
            email: user.email,
            retirementAge: user.retirementAge,
            income: user.income   
        }
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);

        const convertToTransaction = (transaction) => new Transaction(
            transaction.amount,
            transaction.title,
            transaction.description,
            transaction.date.toDate()
        )

        return new User(
            data.email,
            data.name,
            data.income,
            data.monthyTransactions.map(t => convertToTransaction(t)),
            data.bankAccounts.map( bnk => new BankAccount(
                data.balance, 
                data.interest, 
                data.transactionHistory.map( t => convertToTransaction(t)),
                data.type
            )),
            data.retirementBankAccounts.map( bnk => new BankAccount(
                data.balance, 
                data.interest, 
                data.transactionHistory.map( t => convertToTransaction(t)),
                data.type
            )),
            data.monthyReoccuringTransactions.map(t => convertToTransaction(t)),
            data.retirementAge,
            data.dOB.toDate()
        )
    }
};

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                //TODO: Get user data from firestore and create user object
                const userRef = doc(db, "users", user.uid).withConverter(userConverter);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    let user = docSnap.data();
                    
                    resolve(user);
                } else {
                    if(!window.location.href.includes("login") && !window.location.href.includes("sign-up") && !window.location.href.includes("/")){
                        window.location.href ="/login";
                    }
                }
                
            } else {
                resolve(null);
            }
        })
    });
};

const createUser = (name, email, password, dOB, income, retirement, expenses, bankAccounts, rBankAccounts) => {
    return new Promise((resolve, reject) =>{
        createUserWithEmailAndPassword (auth, email, password).then(async (userCredential) => {
            //Signed in
            const user = userCredential.user;
            const uID = user.uid;
            //TODO: create new user in firestore with specific UID
            const userRef = doc(db, "users", uID).withConverter(userConverter);
            let u = new User(email, name, income, expenses, bankAccounts, rBankAccounts, [], retirement, dOB);
            console.log(u.email);
            console.log(u.bankAccounts);
            console.log(u.retirementBankAccounts);
            console.log(rBankAccounts);
            console.log(u.monthyTransactions);
            console.log(u.totalSpending);
            console.log(u.retirementAge);
            console.log(u.dOB.getTime());
            await setDoc(userRef, u);
            resolve("");
        }).catch((error) => {
            //TODO: display error to user
            reject(error.message);
        })
    })
}

function signIn(email, password){
    return new Promise((resolve, reject) =>{
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            //Signed in
            const user = userCredential.user;
            window.location = "http://localhost:3000/home";
            resolve("");
        }).catch((error) => {
            const errorMessage = error.message;
            reject(errorMessage);
        })
    })
}

export { getCurrentUser, createUser, signIn};