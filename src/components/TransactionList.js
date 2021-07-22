import React from "react";
import Identicon from "@polkadot/react-identicon";
import { Link } from 'react-router-dom';

const BlockList = ({ list }) => {
  const size = 32;
  const theme = "polkadot";

  const TransactionInfo = list.map((item, i) => {
    return (
      <tr key={i}>
        <td className="author overflow">
          <div>
            <div className="icon">
                <Identicon value={item.from} size={size} theme={theme} />
            </div>
            <div className="info">{item.from}</div>
          </div>

        </td>
        <td className="author overflow">
          <div>
            <div className="icon">
                <Identicon value={item.to} size={size} theme={theme} />
            </div>
            <div className="info">{item.to}</div>
          </div>
        </td>
        <td className="hash overflow">{item.value}</td>
        
      </tr>
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">From:</th>
          <th scope="col">To:</th>
          <th scope="col">Amount:</th>
        </tr>
      </thead>
      <tbody>{TransactionInfo}</tbody>
    </table>
  );
};

export default BlockList;
