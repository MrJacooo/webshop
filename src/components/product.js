import React from "react";
import { useParams } from "react-router";

export default function Product () {
    const {productId} = useParams()
    return(
        <div>
            productId: {productId}
        </div>
    )
}