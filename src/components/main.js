import React, { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore"
import HouseSmall from "./houseSmall";
import { ConnectedTvOutlined } from "@mui/icons-material";

export default function Main() {
    const [houses, setHouses] = useState(false)

    async function fetchHouses() {
        let collectionSnapshot = await getDocs(collection(db, "houses"))
        let collectionData = []
        collectionSnapshot.forEach((doc) =>
            collectionData = [...collectionData, { ...doc.data(), id: doc.id }]
        )
        setHouses(collectionData)
    }

    useEffect(
        () => {
            fetchHouses()
        }, []
    )
    return (
        <div id="main" style={{ backgroundImage: "url(/images/background.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "right top", minHeight: "100vh" }}>
            {!houses ? <CircularProgress /> :
                houses.map(house => <HouseSmall props={house} />)
            }
        </div>
    )
}