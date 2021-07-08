import React from "react";

const BlockChainInfo = ({lastBlock}) => {
  return (
    <div className="card-deck">
      <div className="card-box">
        <div className="card-body">
          <p className="card-text">
            Last Block
          </p>
          <h5 className="card-title">{lastBlock}</h5>
        </div>
      </div>
      <div className="card-box">
        <div className="card-body">
          <p className="card-text">
            All Transaction
          </p>
          <h5 className="card-title">4,081,166</h5>
          
        </div>
      </div>
      <div className="card-box">
        <div className="card-body">
          <p className="card-text">
            Active Accounts
          </p>
          <h5 className="card-title">382922</h5>
        </div>
      </div>
      <div className="card-box">
        <div className="card-body">
            <p className="card-text">
             Runtime vercion
          </p>
          <h5 className="card-title">9050</h5>
          
        </div>
      </div>
    </div>
  );
};

export default BlockChainInfo;
