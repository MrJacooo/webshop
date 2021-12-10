import React from "react";
import { db} from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { Button } from "@mui/material";

/*
-----------------------------------------------------------------------
                    NOTE: THIS IS ONLY A TEST FUNCTION
-----------------------------------------------------------------------

With this function you can upload big amount of data to Firestore easily as JSON

-----------------------------------------------------------------------
*/

export default function UploadJSON (props){
    function upload() {
        const docRef = doc(db, "houses", props.id)
        setDoc(docRef, 
            {reservations: [
                { week: "13.12.2021 - 19.12.2021", free: true },
                { week: "20.12.2021 - 26.12.2021", free: true },
                { week: "27.12.2021 - 2.1.2022", free: true },
                { week: "3.1.2022 - 9.1.2022", free: true },
                { week: "10.1.2021 - 16.1.2022", free: true },
                { week: "17.1.2021 - 23.1.2022", free: true },
                { week: "24.1.2021 - 2.2.2022", free: true },
                { week: "3.2.2021 - 9.2.2022", free: true },
            ]},{merge: true})
    }

    async function get() {
        console.log(await (await getDoc(doc(db,"houses", props.id))).data())
    }

    return (
        <div>
            <Button onClick={get}>Get DATA</Button>
            <Button onClick={upload}>Upload DATA</Button>
        </div>
    )
}