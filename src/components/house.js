import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { Skeleton, Container } from "@mui/material";
import { storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import "../css/house.css"

export default function House() {
    const { houseId } = useParams()
    const [house, setHouse] = useState({})
    const [images, setImages] = useState(false)
    const [displayImage, setDisplayImage] = useState()
    const [floorplan, setFloorplan] = useState()

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
        setImages(imgArr)
        setHouse(houseData)
    }

    function setImageByName(setter, name, imgArr = images) {
        console.log(name, imgArr)
        imgArr.forEach(img => { if (img.name === name) { setter(img.url) } })
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Container maxWidth="lg">
            <Grid container columnSpacing={6} >
                <Grid item xs={6} >
                    {images ? <img id="mainImg" src={displayImage} style={{ cursor: "pointer" }} /> : <Skeleton className="thumbnail" variant="rectangular" />}
                </Grid>
            </Grid>
        </Container>
    )
}