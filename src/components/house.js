import React from "react";
import { useParams } from "react-router";

export default function House() {
    const { houseId } = useParams()
    return (
        <div>
            houseId: {houseId}
        </div>
    )
}