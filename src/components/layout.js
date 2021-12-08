import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authcontext"
import { Grid } from "@mui/material";

export default function Layout() {
    const { signOut } = useAuth()

    return (
        <div>
            <nav>
                <div>
                    <img src="/images/logo.jpg" height={window.innerHeight / 8} />
                    <Typography variant="h5">
                        Kashiya
                    </Typography>
                </div>
                <div>
                    <Link to="/home">Home</Link>
                    <Link to="/home">About</Link>
                    <Link to="#">Account</Link>
                    <Link to="/" onClick={signOut}>Sign Out</Link>
                </div>
            </nav>
            <div id="navfix">.</div>
            <Outlet />
            <footer>
                <Container maxWidth="md">
                    <Grid container columnSpacing={5} className="footerContent">
                        <Grid item xs={6}>
                            <h4>About</h4>
                            <p>This website was designed to enable people to rent their own asian dream home. It is done by providing an easy platform to Asian homeowners to rent their home on. We hope that one day our dream of being able to provide everyone with a Asian vacation home will become possible.</p>
                            <Link to="#">Learn more</Link>
                        </Grid>
                        <Grid item xs={6}>
                            <h4>Credits</h4>
                            <p>This Website is only a Mockupproject, all of the Houses shown on this place are actually being sold on one another website. You may visit them if you are interested in traditional Japanese country homes.</p>
                            <a href="https://www.koryoya.com" target="_blank" rel="noopener noreferrer">Learn more</a>
                        </Grid>
                    </Grid>
                </Container>
            </footer>
            <div id="subFooter">
                Copyright @ Sebastian Storz 2021
            </div>
        </div>
    )
}
