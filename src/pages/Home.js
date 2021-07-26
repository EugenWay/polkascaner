import React from "react";
import { useState, useEffect, useContext } from "react";
import BlockList from "../components/BlockList";
import TransactionList from "../components/TransactionList";
import BlockChainInfo from "../components/BlockChainInfo";
import PreLoader from "../components/Loader";
import Search from "../components/Search";
import Alert from "../components/Alert";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import { useApi } from "../Api/ApiContext";

export const Home = () => {
  const [blocks, setBlocks] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  const [spec, setSpec] = useState(null);
  const [alert, setAlert] = useState({
    isActive: false,
    type: "alert-primary",
    msg: "",
  });

  const connnection = useApi();

  useEffect(() => {
    console.log(transfers)
  }, [transfers])

  useEffect(() => {
    const connectChain = async () => {
      try {
        const api = await connnection();

        setSpec(await api.runtimeVersion.specVersion.toString());

      
        await api.query.system.events((events) => {

          events.forEach((record) => {

            const { event, phase } = record;
            const types = event.typeDef;

            if(`${event.section}` === 'balances' && `${event.method}` === 'Transfer') {
              
              const transfer = {
                section: `${event.section}`,
                method: `${event.method}`,
                from: '',
                to: '',
                value: ''
              }

              const transferEvent = Array.from(event.data.toHuman())

              transferEvent.forEach((data, index) => {

                if (index === 0) transfer.from = data
                if (index === 1) transfer.to = data
                if (index === 2) transfer.value = data

              });

              setTransfers((transfers) => [...transfers, transfer].reverse())
              
            }
      
          });
        });
      

        // Subscribe to the new headers
        const unsubHeads = await api.derive.chain.subscribeNewHeads(
          async (lastHeader) => {
            const info = await api.derive.accounts.info(`${lastHeader.author}`);

            setLastBlock(`${lastHeader.number}`);
            setBlocks((blocks) => [
              ...blocks,
              {
                number: `${lastHeader.number}`,
                hash: `${lastHeader.hash}`,
                author: `${lastHeader.author}`,
                identity: info.identity,
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
        !isNaN(event.target.value) &&
        event.target.value <= lastBlock
      ) {
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
      <BlockChainInfo lastBlock={lastBlock} runtimeVer={spec} />
      <Alert type={alert.type} msg={alert.msg} isActive={alert.isActive} />
      <Search handler={getDataSearch} />

      <div className="row">
        <div className="col">
          <BlockList list={blocks} />
        </div>
        <div className="col">
          <TransactionList list={transfers}/>
        </div>
      </div>
    </div>
  ) : (
    <PreLoader />
  );
};
