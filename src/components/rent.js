import { getMetadata } from "@firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { Checkbox, Container, FormControlLabel, TextField, FormGroup, Skeleton, ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import UploadJSON from "./uploadJSON";
import "../css/rent.css"
import { flexbox } from "@mui/system";
import {useAuth} from "../contexts/authcontext"
import { arrayUnion } from "@firebase/firestore";

//                {image ?<Avatar alt={data.name} src={image} /> : <Skeleton variant={"circular"}/>}

export default function Rent() {
    const {currentUser} = useAuth()
    const { houseId } = useParams()
    const [data, setData] = useState({})
    const [date, setDate] = useState("")
    const [additions, setAdditions] = useState({bedsheets: false, breakfast: 0})
    const navigate = useNavigate()

    async function getData(){
        getDoc(doc(db, "houses", houseId))
            .then(docRef => { setData(docRef.data());}) 
    }

    function rent(){
        if(date != ""){
            let reservations = data.reservations.slice()
            for(let i=0;i<reservations.length;i++){
                if(reservations[i].week === date)  reservations[i].free = false 
            }
            const docRef = doc(db, "houses", houseId)
            setDoc(docRef,{reservations: reservations}, {merge:true})
            const docRefUser = doc(db, "reservations", currentUser.uid)
            let price = parseInt(data.price,10) + (additions.breakfast * 7 * 10) + (additions.bedsheets ? 350 : 0)
            setDoc(docRefUser, {reservations: arrayUnion({reservation: date,price: price, additions: additions, house: data})}, {merge:true})
            navigate("/home/account")
        }
    }

    useEffect(() => {
        getData()
    },[])
    return (
        <Container maxWidth="lg">
            <h2>{data.name}</h2>
            <h3>Week of Travel</h3>
            <ToggleButtonGroup color="primary" value={date} exclusive onChange={(event, newdate) => setDate(newdate)}>
                {data.reservations && data.reservations.filter(obj => obj.free === true).map(obj =>
                    <ToggleButton value={obj.week}>{obj.week}</ToggleButton>
                )}
            </ToggleButtonGroup>
            <h4>Bedsheets</h4>
                <FormControlLabel control={<Checkbox value={additions.bedsheets} onChange={() => setAdditions({...additions,bedsheets: !additions.bedsheets})} />} label="Additional bedsheets - 50$ per Night"/>
            <h4>Breakfast</h4>
            <FormControlLabel control={<TextField
            id="filled-number"
            label="Breakfast"
            type="number"
            size="small"
            value={additions.breakfast}
            onChange={(e) => setAdditions({...additions, breakfast: Math.abs(parseInt(e.target.value, "10"))})}
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"/>} 
            label="Breakfast - 10$ per Person"/>
            <h2 style={{marginTop: "50px"}}>Offerte</h2>
            <Grid container>
                <Grid item xs={10}>
                    <p>Base Price</p>
                    <p>Bedsheets</p>
                    <p>Breakfast</p>
                </Grid>
                <Grid item xs={1}>
                    <p>1</p>
                    <p>7</p>
                    <p>7</p>
                </Grid>
                <Grid item xs={1}>
                    <p>{data.price}$</p>
                    <p>{additions.bedsheets ? "350$" : "0$"}</p>
                    <p>{additions.breakfast ? additions.breakfast * 7 * 10 +"$": "0$"}</p>
                </Grid>
                <Grid item xs={12} style={{display: "flex", justifyContent: "flex-end", borderTop:"1px solid black", paddingTop: "10px"}}>
                    <p style={{marginRight: "10px"}}>Total: {parseInt(data.price,10) + (additions.breakfast * 7 * 10) + (additions.bedsheets ? 350 : 0)}$</p>
                </Grid>
            </Grid>
            <div style={{display: "flex", justifyContent: "center"}}>
                <Button variant="contained" size="large" className="red" onClick={rent}>Rent Now</Button>
            </div>
            <br style={{height: "5vh"}}></br>
        </Container>
    )
}