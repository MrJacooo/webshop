import React, { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore"
import HouseSmall from "./houseSmall";
import { ConnectedTvOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Backdrop } from "@mui/material";

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
        <div id="main" style={{ backgroundImage: "url(/images/background.jpg)", backgroundRepeat: "no-repeat",backgroundAttachment: "fixed", backgroundPosition: "right top", minHeight: "100vh" }}>
            <Container maxWidth="lg">
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={6}>
                {!houses ? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop> :
                    houses.map(house => <HouseSmall props={house} />)
                }
                </Grid>
            </Container>
        </div>
    )
}