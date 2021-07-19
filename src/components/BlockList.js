import React from "react";
import Identicon from "@polkadot/react-identicon";
import { Link } from 'react-router-dom';
import AccountName from '../components/AccountName'

const BlockList = ({ list }) => {
  const size = 32;
  const theme = "polkadot";

  const blockInfo = list.map((item, i) => {
    return (
      <tr key={i}>
        <th scope="row" className="header"><Link to={`/block/${item.number}`}>{item.number}</Link></th>
        <td className="hash overflow">{item.hash}</td>
        <td className="author">
          <div>
            <div className="icon">
                <Identicon value={item.author} size={size} theme={theme} />
            </div>
            <AccountName author={item.author} identity={item.identity}/>
          </div>

        </td>
      </tr>
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#Block</th>
          <th scope="col">Hash</th>
          <th scope="col">Author</th>
        </tr>
      </thead>
      <tbody>{blockInfo}</tbody>
    </table>
  );
};

export default BlockList;
