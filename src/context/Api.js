import React, { useEffect } from 'react';

import { ApiPromise, WsProvider } from "@polkadot/api";

export const apiContext = React.createContext();

export const api = async() =>{

    const wsProvider = new WsProvider("wss://rpc.polkadot.io");
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log('connected')
    return await api.isReady

}

 




