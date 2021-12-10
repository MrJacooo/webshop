import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useAuth } from "../contexts/authcontext";
import { Container, Grid, Skeleton } from "@mui/material";
import { Paper } from "@mui/material";

export default function Account() {
    const {currentUser} = useAuth()
    const [data, setData] = useState([])

    async function getData() {
        console.log("getting data")
        getDoc(doc(db, "reservations", currentUser.uid))
            .then(docRef => setData(docRef.data().reservations)) 
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <Container maxWidth="lg" sx={{minHeight: "82vh"}}>
            <h2>Your Bookings</h2>
            {data[0]? data.map(obj => <Reservation reservation={obj}/>) : <Skeleton variant="rectangular" height={300}  />}
        </Container>
    )
}

function Reservation (props) {
    return(
        <Paper sx={{padding: "10px", marginBottom: "20px"}}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <h2>{props.reservation.house.name}</h2>
                    <p>{props.reservation.reservation}</p>
                    <p>{props.reservation.additions.bedsheets? "Bedsheets have been Booked" : "No Bedsheets"}</p>
                    <p>{props.reservation.additions.breakfast + " breakfasts have been booked"}</p>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div style={{ width: "100%" }}>
                        <iframe
                            width="100%"
                            frameBorder="0" style={{ border: 0 }}
                            src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyBua4pf7BAFAqhfLHJsqIzWh2T3GpoOGq4&q=" + props.reservation.house.location} />
                    </div>
                </Grid>
            </Grid>
        </Paper>
    )
}