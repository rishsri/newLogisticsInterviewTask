import React, { useState } from "react";
import axios from "axios";
import styles from "./homepage.module.css";

const HomePage = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  // Debounce function to delay API calls
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const delayedHandleChange = debounce(async (value) => {
    try {
      if (value.length > 1) {
        setLoading(true); 
        const response = await axios.get(
          `https://lorriservice.azurefd.net//api/autocomplete?suggest=${value}&limit=20&searchFields=new_locations`
        );
        setSearchResults(response.data?.value);
        setError(null);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      setError("Error fetching data from the API");
      setSearchResults([]);
    } finally {
      setLoading(false); 
    }
  }, 1000);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    delayedHandleChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Welcome {props.name}</h1>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      {loading && <p className={styles.loader}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {searchResults.length > 0 && (
        <ul className={styles.resultsList}>
          {searchResults.map((result) => (
            <li key={result.id}>{result.location_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
