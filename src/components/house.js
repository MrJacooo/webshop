import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { Skeleton, Container } from "@mui/material";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import "../css/house.css"
import { HouseOutlined } from "@mui/icons-material";
import { ImageList, ImageListItem } from "@mui/material";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { exactProp } from "@mui/utils";

export default function House() {
    const { houseId } = useParams()
    const [house, setHouse] = useState({})
    const [images, setImages] = useState(false)
    const [displayImage, setDisplayImage] = useState()
    const [floorplan, setFloorplan] = useState()
    const navigate = useNavigate()

    async function getPeople() {
        let data = await fetch("...").then(response => response.json())
    }

    async function getData() {
        //Create Temp vars to avoid problems with usestate
        let imgArr = []
        let houseData = []

        //Fetch data from Firestore
        await getDoc(doc(db, "houses", houseId))
            .then(docRef => { houseData = docRef.data() })
        for (let i = 0; i < houseData.images.length; i++) {
            await getDownloadURL(ref(storage, houseData.images[i])).then(url => { imgArr = [...imgArr, { url: url, name: houseData.images[i] }] })
        }

        //transfer temp content to permanent variables
        setImageByName(setDisplayImage, houseData.displayImage, imgArr)
        setImageByName(setFloorplan, houseData.floorplan, imgArr)
        setImages(imgArr)
        setHouse(houseData)
    }

    function setImageByName(setter, name, imgArr = images.slice()) {
        console.log(name, imgArr)
        let index = imgArr.findIndex((img) => img.name === name)
        if (index != -1) {
            setter(imgArr[index].url)
            imgArr.splice(index, 1)
            setImages(imgArr)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div >
            <Container maxWidth="lg">
                <Grid container columnSpacing={6} rowSpacing={2} >
                    <Grid item xs={12} lg={6} >
                        {images ? <img id="mainImg" src={displayImage} /> : <Skeleton className="thumbnail" variant="rectangular" height={400} width={600} />}
                    </Grid>
                    <Grid item xs={12} lg={6} className="houseText">
                        <h3>Details:</h3>
                        <p>{house.location}</p>
                        <p>{house.size} Square Meters</p>
                        <p>{house.rooms} Rooms</p>
                        <p>{house.price}$ per Week</p>
                        <Link style={{ color: "red" }} to="/flyer.pdf" download target="_blank" >Download Flyer</Link><br />
                        <Button variant="contained" size="large" className="red" onClick={() => navigate(`/home/rent/${houseId}`)}>rent now</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <h2>{house.name}</h2>
                        <p>{house.description}</p>
                        <h3>Things in the Vacinity</h3>
                        <p>{house.trips}</p>

                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ width: "100%" }}>
                            <iframe
                                width="100%"
                                height="250"
                                frameBorder="0" style={{ border: 0 }}
                                src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyBua4pf7BAFAqhfLHJsqIzWh2T3GpoOGq4&q=" + house.location} />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        {images ?
                            <ImageList cols={2} variant="mansory" >
                                {images.map((item) => (
                                    <ImageListItem key={item.name}>
                                        <img
                                            className="imageListImage"
                                            src={`${item.url}`}
                                            srcSet={`${item.url}`}
                                            alt={item.name}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                            </ImageList> : <Skeleton variant="rectangular" style={{ width: "100%", height: 500 }} />}
                    </Grid>
                    <Grid item xs={12} >
                        {images ? <img id="floorplan" src={floorplan} alt="floorplan" /> : <Skeleton className="thumbnail" variant="rectangular" height={500} />}
                    </Grid>
                </Grid>
            </Container>

        </div>
    )
}