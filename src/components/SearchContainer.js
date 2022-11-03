import React from "react";
import { useSelector } from "react-redux";
const SearchContainer = () => {
  const { search, searchStatus, searchType, sort, sortOptions } = useSelector(
    (store) => store.allJobs
  );
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="generic-form" onSubmit={handleSubmit}>
      <h2>search Form</h2>
      <div className="form-control"></div>
    </form>
  );
};

export default SearchContainer;
