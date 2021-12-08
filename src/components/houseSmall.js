import React, { useEffect, useState } from "react";
import { Grid, Paper, Skeleton, Typography } from "@mui/material";
import { Box, grid } from "@mui/system";
import { storage } from "../firebase";
import {ref, getDownloadURL } from "firebase/storage";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";


export default function HouseSmall({ props }) {
    const [image, setImage] = useState(false)
    const navigate = useNavigate()

    function getTitleImage(){
        getDownloadURL(ref(storage, props.displayImage))
        .then(url => setImage(url))
    }

    useEffect(
        () => {
            getTitleImage()
        },[]
    )
    return (
        <Grid item xs={12} md={6}>
            <Paper elevation="9">
                <div className="houseSmall">
                    { image ?<img className="thumbnail" src={image}/>:<Skeleton className="thumbnail" height={220} width={300} variant="rectangular" />}
                    <div>
                        <div>
                            <h4>{props.name}</h4>
                            <p className="detail">{props.price}$ per night</p>
                            <p className="detail">{props.size} Square Meters</p>  
                            <p className="detail">{props.rooms} Rooms</p>
                        </div>
                        <Button variant="contained" onClick={() => navigate(`/home/${props.id}`)}>rent now</Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    )
}