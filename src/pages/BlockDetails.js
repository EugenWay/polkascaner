import React from "react";
import { useState, useEffect, useContext } from "react";
import PreLoader from "../components/Loader";
import Identicon from "@polkadot/react-identicon";
import { Link, useParams } from "react-router-dom";
import {apiContext} from '../context/Api';


export const BlockDetails = () => {

  const { id } = useParams();
  const [block, setBlock] = useState(id);
  const [fetching, setFetching] = useState(true);

  const [header, setHeader] = useState(null);
  const [hash, setHash] = useState(null);
  const [author, setAuthor] = useState(null);
  const [parentHash, setParentHash] = useState(null);
  const [parentBlock, setParentBlock] = useState(null);
  const [stateRoot, setStateRoot] = useState(null);
  const [extrinsicsRoot, setExtrinsicsRoot] = useState(null);
  const [creationDate, setCreationDate] = useState(``);
  const [extrinsics, setExtrinsics] = useState(null);

  // get api context 
  const connnection = useContext(apiContext);

  useEffect(() => {
    const connectChain = async () => {
      try {
        const api = await connnection();

        const blockHash = await api.rpc.chain.getBlockHash(block);
        const signedBlock = await api.rpc.chain.getBlock(blockHash);
        const header = await api.derive.chain.getHeader(blockHash);
        
        const timestamp = await api.query.timestamp.now.at(blockHash);
        const date = new Date(timestamp.toNumber());

        console.log(api.runtimeVersion.toHuman())

        setExtrinsics(signedBlock.block.extrinsics.map((ex, index) => {

          const { isSigned, meta, method: { args, method, section } } = ex;

          return (
            <tr key={index}>
              <th scope="row">{section}</th>
              <td>{method} {args.map((a) => a.toString()).join(', ')}</td>
            </tr>
          )  
        }))

        setHeader(`${header.number}`);
        setHash(`${blockHash}`);
        setAuthor(`${header.author}`);
        setParentHash(`${header.parentHash}`);
        setStateRoot(`${header.stateRoot}`);
        setExtrinsicsRoot(`${header.extrinsicsRoot}`);
        setCreationDate(`${date.toUTCString()}`);
        setParentBlock(header.number.toNumber() - 1);

        setFetching(false);

      } catch (err) {
        console.log(err);
      }
    };
    connectChain();
  }, []);

  return fetching ? (
    <PreLoader />
  ) : (
    <div>
      <h1>Block #{block}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th scope="row">Timestamp:</th>
            <td>{creationDate}</td>
          </tr>
          <tr>
            <th scope="row">Hash</th>
            <td>{hash}</td>
          </tr>
          <tr>
            <th scope="row">Parent hash</th>
            <td>
              <a href={`/block/${parentBlock}`}>{parentHash}</a>
            </td>
          </tr>
          <tr>
            <th scope="row">State Root</th>
            <td>{stateRoot}</td>
          </tr>
          <tr>
            <th scope="row">Extrinsics Root</th>
            <td>{extrinsicsRoot}</td>
          </tr>
          <tr>
            <th scope="row">Transactions</th>
            <td>0</td>
          </tr>

          <tr>
            <th scope="row">Runtime Versions</th>
            <td>9050</td>
          </tr>
          <tr>
            <th scope="row">Block time</th>
            <td>6 seconds</td>
          </tr>
          <tr>
            <th scope="row">Block author</th>
            <td>
              <Identicon value={author} size={32} theme={"polkadot"} />
              <Link to={`/account/${author}`}>{author}</Link>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <h2>Extrinsics</h2>
        <table className="table">
          <tbody>
            {extrinsics}
          </tbody>
        </table>
        
      </div>
    </div>
  );
};
