import React from "react";

const BlockChainInfo = ({lastBlock, toggler}) => {
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
             Runtime version
          </p>
          <h5 className="card-title">9050</h5>
          <form className="justify-content-start">
            <button className="btn btn-outline-success me-2" type="button" onClick={toggler}>Toggle Network</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlockChainInfo;
