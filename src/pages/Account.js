import React, {Fragment} from "react"
import { useState, useEffect } from "react";
import Identicon from "@polkadot/react-identicon";

export const Account = () => {

    const size = 64;
    const theme = "polkadot";
    const [account, setAccount] = useState(null)

    useEffect(() => {
        let url = window.location.pathname.replace(/\/account\//g,'');
        setAccount(url)
    }, [])

    return (
        <Fragment>
            <div>
                <h1><Identicon value={account} size={size} theme={theme} />{account}</h1>
            </div>
            
            <p></p>
        </Fragment>
    )
}