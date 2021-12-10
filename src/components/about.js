import { Mail } from "@mui/icons-material";
import { Container, Grid } from "@mui/material";
import { height } from "@mui/system";
import React from "react";



export default function About() {
    return (<>
        <Container maxWidth="lg">
            <h2>About</h2>
            <p>This website is a Project to try creating a webshop without any CMS. The website was realized using a Javascript Framework called ReactJS. To store the Data Firebase was used. All of the Content in this website is not real but only copied from other websites as a mockup, you can learn more about this in the footer.</p>
            <h2 style={{ marginBottom: 0 }}>Persons</h2>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <h3>Peter Rutschmann</h3>
                    <p><a href="mailto:peter.rutschmann@bbw.ch" >Mail: peter.rutschmann@bbw.ch</a></p>
                    <p>Phone: 0791111111</p>
                    <p>Occupation: Teacher</p>
                    <p>Organisation: BBW</p>
                    <p>Role: Supervisor</p>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h3>Sebastian Storz</h3>
                    <p><a href="mailto:example.mail@example.ch" >Mail: example.mail@example.ch</a></p>
                    <p>Phone: 0792222222</p>
                    <p>Occupation: Student</p>
                    <p>Organisation: BBW</p>
                    <p>Role: Designer & Developer</p>
                </Grid>
                <Grid item xs={12} md={6}>
                    <h2>Organisation:</h2>
                    <p>BBW - Berufsbildungsschule Winterthur</p>
                    <p>Wülflingerstrasse 17 </p>
                    <p>8400 Winterthur</p>
                    <p><a href="mailto:rektorat@bbw.ch" >Mail: rektorat@bbw.ch</a></p>
                </Grid>
                <Grid item xs={0} md={6}>
                    <div style={{ width: "100%" }}>
                        <iframe
                            width="100%"
                            height="250"
                            frameBorder="0" style={{ border: 0 }}
                            src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyBua4pf7BAFAqhfLHJsqIzWh2T3GpoOGq4&q=Wülflingerstrasse 17 8400 Winterthur"} />
                    </div>
                </Grid>
            </Grid>
        </Container>
        <div style={{ height: "100%", width: "100%", backgroundSize: "contain", backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Berufsbildungsschule_Winterthur_logo.svg/1200px-Berufsbildungsschule_Winterthur_logo.svg.png)" }}></div>
    </>
    )
}