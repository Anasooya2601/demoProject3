import React, { useState } from "react";

const [searchQuery, setSearchQuery] = useState("");
function SearchBar(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for research papers"
        value={props.searchQuery}
        onChange={(event) => props.setSearchQuery(event.target.value)}
      />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
}
export default SearchBar;
