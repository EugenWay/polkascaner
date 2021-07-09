import React, {Fragment} from "react"
import { useState, useEffect } from "react";

export const SearchResult = () => {

    const [account, setAccount] = useState(null)

    useEffect(() => {
        let url = window.location.pathname.replace(/\/search\//g,'');
        setAccount(url)
    }, [])

    return (
        <Fragment>
            <h1>Search Page</h1>
            <p>{account}</p>
        </Fragment>
    )
}
