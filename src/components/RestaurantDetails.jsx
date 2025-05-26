import React, { useState } from "react";

import { getMenuDetails } from "./MenuApi";

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchData(query);
  };

  const fetchData = (query) => {
    const res = getMenuDetails(query);
    setResults(res);
  };

  return (
    <div className="search-component">
      <h3>Search Restaurants</h3>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search restaurants..."
      />
      {/* Display images from the results */}
      {results.length > 0 && (
        <div className="image-results">
          {results.map((result, index) => (
            <div key={index} className="image-item">
              <img
                src={result.link}
                alt={result.title}
                style={{ maxWidth: "200px", height: "auto" }}
              />
              <p>{result.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
