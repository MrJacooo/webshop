import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db} from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore"
import { Skeleton, Container } from "@mui/material";
import { storage } from "../firebase";
import {ref, getDownloadURL } from "firebase/storage";

export default function House() {
    const { houseId } = useParams()
    const [house, setHouse] = useState({})
    const [images, setImages] = useState(false)
    const [displayImage,setDisplayImage] = useState()
    const [floorplan,setFloorplan] = useState([])

    function getData() {
        getDoc(doc(db,"houses", houseId))
        .then(docRef => {setHouse(docRef.data());getImages(docRef.data().images)})
    }

    function getImages(imagesArray){
        console.log(imagesArray)
        imagesArray.forEach((img) =>
            getDownloadURL(ref(storage, img)).then(url => {setImages([...images, {url: url, name: img}]); updateImages()})
        )
    }

    function updateImages(){
        setDisplayImage(getImageByName(house.displayImage))
    }

    function getImageByName(name){
        console.log(images)
        images.forEach(img =>
            {if(img.name === name){return img.url}})
    }

    useEffect(()=>
    {
        getData()
    },[])

    return (
        <Container maxWidth="lg">
            <Grid container columnSpacing={6} height={500}>
                <Grid item>
                { images ?<img className="thumbnail" src={displayImage}style={{cursor: "pointer"}}/>:<Skeleton className="thumbnail" variant="rectangular" />}
                </Grid>
            </Grid>
        </Container>
    )
}