import React from "react";
import { db} from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"

/*
-----------------------------------------------------------------------
                    NOTE: THIS IS ONLY A TEST FUNCTION
-----------------------------------------------------------------------

With this function you can upload big amount of data to Firestore easily as JSON

-----------------------------------------------------------------------
*/

export default function UploadJSON (){
    function upload() {
        const docRef = doc(db, "houses", "ID")
        setDoc(docRef, 
            {reservations: [
            { week: "13.12.2021", free: false },
            { free: false, week: "20.12.2021" },
            { free: true, week: "27.12.2021" },
            { week: "3.1.2021", free: false },
            { week: "10.1.2021", free: true },
            { week: "17.1.2021", free: false },
            { week: "24.1.2021", free: true },
            { week: "31.1.2021", free: true }
        ]},{merge: true})
    }

    async function get() {
        console.log(await (await getDoc(doc(db,"houses", ID))).data())
    }

    return (
        <div>
            <Button onClick={get}>Get DATA</Button>
            <Button onClick={upload}>Upload DATA</Button>
        </div>
    )
}