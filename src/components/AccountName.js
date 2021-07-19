import React from "react";

const AccountName = ({ author, identity }) => {
  if (identity?.display) {
    return identity?.displayParent ? (
      <div className="info">
        <div className="nickname">{identity.displayParent}</div>
      </div>
    ) : (
      <div className="info">
        <div className="nickname">{identity.display}</div>
      </div>
    );
  }

  return (
    <div className="info">
      <div>{author}</div>
    </div>
  );
};

export default AccountName;
