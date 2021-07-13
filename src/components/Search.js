import React from "react";

const Search = ({ handler }) => {
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
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.172 24l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7zm-3-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm3 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm3 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Search;
