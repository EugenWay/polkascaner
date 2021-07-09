import React from "react";


const Search = ({handler}) => {

  return (

    <div className="pt-2 pb-2">
    <div className="input-group rounded">
      <input
        type="text"
        className="form-control rounded"
        placeholder="Search by block/ account"
        onKeyPress={handler}
      />
      <span className="input-group-text border-0" id="search-addon">
        <i className="fas fa-search"></i>
      </span>
    </div>
    </div>
  );
};

export default Search;