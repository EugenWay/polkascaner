import React from "react";
import { useState, useEffect, useContext } from "react";
import BlockList from "../components/BlockList";
import BlockChainInfo from "../components/BlockChainInfo";
import PreLoader from "../components/Loader";
import Search from "../components/Search";
import Alert from "../components/Alert";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";
import {apiContext} from '../context/Api';

export const Home = () => {
  const [blocks, setBlocks] = useState([]);
  const [lastBlock, setLastBlock] = useState(null);
  const [spec, setSpec] = useState(null);
  const [alert, setAlert] = useState({
    isActive: false,
    type: "alert-primary",
    msg: "",
  });

  // get api context 
  const connnection = useContext(apiContext);
  
  useEffect(() => {

    const connectChain = async () => {
      try {

        const api  = await connnection()
        
        setSpec(await api.runtimeVersion.specVersion.toString());

        await api.query.system.events((events) => {

          const newEvents = events.map((record) => {
            // Extract the phase, event and the event types
            const { event, phase } = record;
            const types = event.typeDef;

            const data = event.data.forEach((data, index) => {
              console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
            });

            return {
              section: `${event.section}`,
              method: `${event.method}`,
              phase: `${phase}`,
              data: event.data
            }

          }).filter((event) => event.section !== 'system' && (!['balances', 'treasury'].includes(event.section) || !['Deposit'].includes(event.method)) &&
          (!['parasInclusion', 'inclusion'].includes(event.eventsection) || !['CandidateBacked', 'CandidateIncluded'].includes(event.method)))

          console.log(newEvents)
          
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
          <h2>Exrintics</h2>
        </div>
      </div>
      
    </div>
  ) : (
    <PreLoader />
  );
};
