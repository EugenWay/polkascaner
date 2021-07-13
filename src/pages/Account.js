import React, {Fragment} from "react"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Identicon from "@polkadot/react-identicon";

export const Account = () => {

    const { adress } = useParams();

    const size = 64;
    const theme = "polkadot";
    const [account, setAccount] = useState(adress)


    return (
        <Fragment>
            <div>
                <h1><Identicon value={account} size={size} theme={theme} />{account}</h1>
            </div>
            
            <p></p>
        </Fragment>
    )
}