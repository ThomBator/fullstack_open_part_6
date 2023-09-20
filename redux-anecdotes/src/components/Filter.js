import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const handleChange = (event) => {
    event.preventDefault();
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    dispatch(filterChange(newSearchTerm));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={searchTerm} onChange={handleChange} />
    </div>
  );
};

export default Filter;
