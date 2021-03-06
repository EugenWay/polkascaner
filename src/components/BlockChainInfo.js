import React from "react";

const BlockChainInfo = ({lastBlock, toggler, runtimeVer}) => {
  return (
    <div className="card-deck">
      <div className="card-box col-lg-3 col-sm-6">
        <div className="card-body">
          <p className="card-text">
            Last Block
          </p>
          <h5 className="card-title">{lastBlock}</h5>
        </div>
      </div>
      <div className="card-box col-lg-3 col-sm-6">
        <div className="card-body">
          <p className="card-text">
            All Transaction
          </p>
          <h5 className="card-title">4,081,166</h5>
          
        </div>
      </div>
      <div className="card-box col-lg-3 col-sm-6">
        <div className="card-body">
          <p className="card-text">
            Active Accounts
          </p>
          <h5 className="card-title">382922</h5>
        </div>
      </div>
      <div className="card-box col-lg-3 col-sm-6">
        <div className="card-body">
            <p className="card-text">
             Runtime version
          </p>
          <h5 className="card-title">{runtimeVer}</h5>
        </div>
      </div>
    </div>
  );
};

export default BlockChainInfo;
