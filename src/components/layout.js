import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/authcontext"

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
                    <Link to="#">Home</Link>
                    <Link to="#">Account</Link>
                    <Link to="/" onClick={signOut}>Sign Out</Link>
                </div>
            </nav>
            <div id="navfix">.</div>
            <Outlet />
            <footer>
                footer
            </footer>
        </div>
    )
}
