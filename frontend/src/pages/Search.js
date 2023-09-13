import React, { useState } from "react";
import axios from "axios";
import "./css/Search.css"
import { Link } from "react-router-dom";
import userImg from "../images/user.png";
import backButton from "../images/back.png";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/friends/search?query=${query}`, config);
      setResults(response.data);
      console.log(results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <a href="/home"><img src={backButton} alt="backButton" className="backButton"/></a>
      <p>Search for users here</p>
      <div className="textInputWrapper">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          className="textInput"
          placeholder="Search Here"
        />
      </div>
      <div className="search-button">
        <button onClick={handleSearch}>
          <span></span>
          <span></span>
          <span></span>
          <span></span> Search
        </button>
      </div>
      <div className="results">
        {results.map((user) => (
          <div key={user._id}>
            <Link to={`/friends/${user._id}`}>
              <div className="usercard">
                <img src={userImg} alt="profile" />
                <a href={`/friends/${user._id}`}>{user.name}</a>
              </div>
            </Link>
            {/* <a href={`/friends/${user._id}`}>{user.name}</a> */}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Search;