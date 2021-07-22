import React, { useEffect } from 'react';

import { ApiPromise, WsProvider } from "@polkadot/api";

export const apiContext = React.createContext();

export const api = async(props) =>{

    try {
        const wsProvider = new WsProvider("wss://rpc.polkadot.io");
        const api = await ApiPromise.create({ provider: wsProvider });
        await api.isReady

        console.log('connected')

        return api

    } catch(err) {
        console.error(err)
    }
    
}

 




