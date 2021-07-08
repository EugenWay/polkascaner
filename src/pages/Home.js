import React from "react";
import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import BlockList from "../components/BlockList";
import BlockChainInfo from "../components/BlockChainInfo";
import PreLoader from "../components/Loader";

export const Home = () => {
  const [blocks, setBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);

  useEffect(() => {
    const connectChain = async () => {
      try {
        const wsProvider = new WsProvider("wss://rpc.polkadot.io");
        const api = await ApiPromise.create({ provider: wsProvider });
        await api.isReady;

        const chain = await api.rpc.system.chain();

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

            console.log(lastHeader)
          }
        );
      } catch (err) {
        console.log(err);
      }
    };

    connectChain();
  }, []);

  return lastBlock ? (
    <div>
      <BlockChainInfo lastBlock={lastBlock}/>
      <BlockList list={blocks} />
    </div>
  ) : (
    <PreLoader />
  );
};
