import React from "react";
import { useState, useEffect } from "react";
import BlockList from "../components/BlockList";
import BlockChainInfo from "../components/BlockChainInfo";
import PreLoader from "../components/Loader";
import Search from "../components/Search";
import Alert from "../components/Alert";

import { ApiPromise, WsProvider } from "@polkadot/api";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";

export const Home = () => {
  const [blocks, setBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  const [alert, setAlert] = useState({
    isActive: false,
    type: "alert-primary",
    msg: "",
  });


  useEffect(() => {
    const connectChain = async () => {
      try {
        const wsProvider = new WsProvider("wss://rpc.polkadot.io");
        const api = await ApiPromise.create({ provider: wsProvider });
        await api.isReady;

        // Subscribe to the new headers
        const unsubHeads = await api.derive.chain.subscribeNewHeads(
          (lastHeader) => {
            setLastBlock(`${lastHeader.number}`);
            setBlocks((blocks) => [
              ...blocks,
              {
                number: `${lastHeader.number}`,
                hash: `${lastHeader.hash}`,
                author: `${lastHeader.author}`,
              },
            ]);
          }
        );
    
      } catch (err) {
        console.log(err);
      }
    };

    connectChain();
  }, []);

  const isValidAddressPolkadotAddress = (address) => {
    try {
      encodeAddress(
        isHex(address) ? hexToU8a(address) : decodeAddress(address)
      );

      return true;
    } catch (error) {
      return false;
    }
  };

  const getDataSearch = (event) => {
    if (event.key === "Enter") {
      if (isValidAddressPolkadotAddress(event.target.value)) {
        window.location.href = `account/${event.target.value}`;
      } else if (
        !isNaN(event.target.value) && event.target.value <= lastBlock
      ) {
        console.log("here")
        window.location.href = `block/${event.target.value}`;
      } else {
        setAlert({
          isActive: true,
          type: "alert-danger",
          msg: "This is not a block or valid Substrate adress. Please cheack again",
        });

        console.log("Wrong adress!");
      }
    }
  };

  return lastBlock ? (
    <div>
      <BlockChainInfo lastBlock={lastBlock} />
      <Alert type={alert.type} msg={alert.msg} isActive={alert.isActive} />
      <Search handler={getDataSearch} />
      <BlockList list={blocks} />
    </div>
  ) : (
    <PreLoader />
  );
};
