import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAUiiaKRRS8FGc5OyucOg7A1-1q7dXkll8",
    authDomain: "fir-proto-test-website-2.firebaseapp.com",
    databaseURL: "https://fir-proto-test-website-2.firebaseio.com",
    projectId: "fir-proto-test-website-2",
    messagingSenderId: "997117701698",
    appId: "1:997117701698:web:da3d2de95db9756762c7db",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
