import React from "react";
import Identicon from "@polkadot/react-identicon";

const BlockList = ({ list }) => {
  const size = 32;
  const theme = "polkadot";

  const blockInfo = list.map((item, i) => {
    return (
      <tr key={i}>
        <th scope="row">{item.number}</th>
        <td>{item.hash}</td>
        <td>
          <Identicon value={item.author} size={size} theme={theme} />
          {item.author}
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
