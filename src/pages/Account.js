import React, { Fragment } from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Identicon from "@polkadot/react-identicon";
import PreLoader from "../components/Loader";
import {apiContext} from '../context/Api';

export const Account = () => {
  const { adress } = useParams();

  const size = 64;
  const theme = "polkadot";
  const [account, setAccount] = useState(adress);
  const [totalBalance, setTotalBalance] = useState(null);
  const [freeBalance, setFreeBalance] = useState(null);
  const [reserved, setReserved] = useState(null);
  const [nonce, setNonce] = useState(null);
  const [fetching, setFetching] = useState(true);

   // get api context 
   const connnection = useContext(apiContext);

  useEffect(() => {
    const connectChain = async () => {
      try {
        const api  = await connnection()

        const { nonce, data: balance } = await api.query.system.account(adress);
        const all = await api.query.system.account(adress);

        const balance1 = await api.derive.balances.all(adress);
        console.log(balance1)

        setFreeBalance(`${balance.free.toHuman()}`);
        setReserved(`${balance.reserved.toHuman()}`);
        setTotalBalance(
          `${balance.reserved.toNumber() + balance.free.toNumber()}`
        );
        setNonce(`${nonce}`);

        setFetching(false);
      } catch (err) {
        console.log(err);
      }
    };

    connectChain();
  }, []);

  return fetching ? <PreLoader/> : (
    <section>
      <header className="card-header">
        <Identicon value={account} size={size} theme={theme} />
        <div className="adress">{account}</div>
      </header>
      <section>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Total balance:</th>
              <td>{totalBalance}</td>
            </tr>
            <tr>
              <th scope="row">Free Balance</th>
              <td>{freeBalance}</td>
            </tr>
            <tr>
              <th scope="row">Reserved Balance</th>
              <td>{reserved}</td>
            </tr>
            <tr>
              <th scope="row">Nonce</th>
              <td>{nonce}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};
