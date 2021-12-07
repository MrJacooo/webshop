import React from "react";
import { Typography, Container } from "@mui/material";

export default function Main(){
    return(
        <div style={{backgroundImage: "url(/images/background.jpg)", backgroundRepeat: "no-repeat", backgroundPosition: "right top", minHeight: "100vh"}}>
            <Container>
                <Typography variant="h4">
                    your next destination.
                </Typography>
            </Container>
        </div>
    )
}