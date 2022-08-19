import React, { useEffect, useState } from "react";

function FetchApi() {
    const [memes, setMemes] = useState([]);
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((res) => {
                setMemes(res.data.memes);
            })
            .catch((error) => console.log(error));
    }, []);

    return [memes, setMemes];
}

export default FetchApi;
