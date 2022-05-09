import axios from "axios";
import React, { useEffect, useState } from "react"

function Error() {
    let [url, setUrl] = useState("")

    useEffect(() => {
        axios.get("https://api.thecatapi.com/v1/images/search")
            .then((res) => {
                setUrl(res.data[0].url)
            });

    }, [])

    return (
        <div>
            <h1>404</h1>
            <img src={url} />
        </div>


    )
}

export default Error;