import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAj-O6KBey_pfcSX7fLgBilOH1cAPYmJtA",
    authDomain: "webshop-m150.firebaseapp.com",
    projectId: "webshop-m150",
    storageBucket: "webshop-m150.appspot.com",
    messagingSenderId: "105727324525",
    appId: "1:105727324525:web:390f33f744e907b678ea64"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);