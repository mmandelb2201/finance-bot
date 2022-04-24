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
            monthyReoccuringTransactions: user.monthyReoccuringTransactions.map( rTransaction => {
                return { 
                    startDate: Timestamp.fromDate(rTransaction.startDate),
                    period: rTransaction.peroid
                };
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
            ...user     
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
            data.nChildren,
            data.nChildrenCollege,
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
                    reject(new Error('User does not exist!'));
                }
                
            } else {
                resolve(null);
            }
        })
    });
};

const createUser = (name, email, password) => {
    return new Promise((resolve, reject) =>{
        createUserWithEmailAndPassword (auth, email, password).then(async (userCredential) => {
            //Signed in
            const user = userCredential.user;
            const uID = user.uid;
            //TODO: create new user in firestore with specific UID
            const userRef = doc(db, "users", uID).withConverter(userConverter);
            await setDoc(userRef, new User(email, name, 0, [], [], [], [], 0, 0, 0, new Date()));
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