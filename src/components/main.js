import React, { useEffect, useState } from "react";
import { Typography, Container, Paper } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore"
import HouseSmall from "./houseSmall";
import { ConnectedTvOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { Backdrop } from "@mui/material";
import "../css/main.css"

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
        <div id="main" style={{ backgroundImage: "url(/images/background.jpg)", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", backgroundPosition: "right top", }}>
            <Container maxWidth="lg">
                <div id="mainText">
                    <Typography variant="h4">
                        Rent your next Home.
                    </Typography>

                </div>
                <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={6}>
                    {!houses ? <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}>
                        <CircularProgress color="inherit" />
                    </Backdrop> :
                        houses.map(house => <HouseSmall props={house} />)
                    }
                </Grid>
                <Grid container justifyContent={"center"} >
                    <Grid item item xs={12} >
                        <Paper className="mainText">
                            <Typography variant="h5">
                                We Provide so you may rest
                            </Typography>
                            <p>Are you tired of your every day worklife, are you searching for an alternative to your standart occoupation. Rent one of our Houses for a week and enjoy the world like you have never before. A relaxing week to learn to appreciate life anew. Explore the rural worlds of Japan by renting one of our Kominkas, or find a place in our lodges to explore the busteling cities of Kyoto.</p>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}