import React from "react";
import { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import PreLoader from "../components/Loader";
import Identicon from "@polkadot/react-identicon";
import { Link } from "react-router-dom";

export const BlockDetails = () => {
  const [block, setBlock] = useState(
    window.location.pathname.replace(/\/block\//g, "")
  );
  const [fetching, setFetching] = useState(true);

  const [header, setHeader] = useState(null);
  const [hash, setHash] = useState(null);
  const [author, setAuthor] = useState(null);
  const [parentHash, setParentHash] = useState(null);
  const [parentBlock, setParentBlock] = useState(null);
  const [stateRoot, setStateRoot] = useState(null);
  const [extrinsicsRoot, setExtrinsicsRoot] = useState(null);
  const [creationDate, setCreationDate] = useState(``);

  useEffect(() => {
    const connectChain = async () => {
      try {
        const wsProvider = new WsProvider("wss://rpc.polkadot.io");
        const api = await ApiPromise.create({ provider: wsProvider });
        await api.isReady;

        const blockHash = await api.rpc.chain.getBlockHash(block);
        const signedBlock = await api.rpc.chain.getBlock(blockHash);
        const header = await api.derive.chain.getHeader(blockHash);

        const timestamp = await api.query.timestamp.now.at(blockHash);
        const date = new Date(timestamp.toNumber());

        setHeader(`${header.number}`);
        setHash(`${blockHash}`);
        setAuthor(`${header.author}`);
        setParentHash(`${header.parentHash}`);
        setStateRoot(`${header.stateRoot}`);
        setExtrinsicsRoot(`${header.extrinsicsRoot}`);
        setCreationDate(`${date.toUTCString()}`);
        setParentBlock(header.number.toNumber() - 1);

        setFetching(false);

        signedBlock.block.extrinsics.forEach((ex, index) => {
          // the extrinsics are decoded by the API, human-like view
          console.log(index, ex.toHuman());

          const {
            isSigned,
            meta,
            method: { args, method, section },
          } = ex;

          // explicit display of name, args & documentation
          console.log(
            `${section}.${method}(${args.map((a) => a.toString()).join(", ")})`
          );
          console.log(meta.documentation.map((d) => d.toString()).join("\n"));

          // signer/nonce info
          if (isSigned) {
            console.log(
              `signer=${ex.signer.toString()}, nonce=${ex.nonce.toString()}`
            );
          }
        });
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
              <Link to={`/block/${parentBlock}`}>{parentHash}</Link>
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
    </div>
  );
};
