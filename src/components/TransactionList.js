import React from "react";
import Identicon from "@polkadot/react-identicon";
import toShortAddress from '../util/toShortAddress'

const BlockList = ({ list }) => {
  const size = 32;
  const theme = "polkadot";

  const TransactionInfo = list.map((item, i) => {
    return (
      <tr key={i}>
        <td className="transfer overflow">
          <div>
            <div className="icon">
                <Identicon value={item.from} size={size} theme={theme} />
            </div>
            <div className="info">{toShortAddress(item.from)}</div>
          </div>

        </td>
        <td className="transfer overflow">
          <div>
            <div className="icon">
                <Identicon value={item.to} size={size} theme={theme} />
            </div>
            <div className="info">{toShortAddress(item.to)}</div>
          </div>
        </td>
        <td className="value overflow">{item.value}</td>
        
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
