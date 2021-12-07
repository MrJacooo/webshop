import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/authcontext";

export default function RequireAuth({ children }){
    const {currentUser} = useAuth()
    let location = useLocation()
    //If user isnt signed In
    if(!currentUser){
        //sends the original location so it can be recovered later and user is not send to home page, nicer user experience
        return <Navigate to="/" state={{from: location}} />
    }
    //User is signed in, proceed normally
    return children
}