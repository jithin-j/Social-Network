import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";

const Home = () => {
    const [friends, setFriends] = useState([]);
    useEffect(() => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const id = localStorage.getItem("userid");
      const url = `http://localhost:3000/api/v1/friends/view-friends/${id}`;
      axios.get(url, config).then((res) => {
        setFriends(res.data);
        // console.log(res.data[0].friends);
      });
    }, []);
    const id = localStorage.getItem("userid");
    const friendRequestsURL = `/friends/friend-requests/${id}`;
  return (
    <div>
      <Link to="/users/search">
        {" "}
        <button>Search for friends</button>
      </Link>
      <Link to={friendRequestsURL}>
        {" "}
        <button>Friend Requests</button>
      </Link>
      <h1>My Friends</h1>
      <ul>
        {friends.map((friends) => (
          <li key={friends._id}>
            <a href={`/friends/${friends._id}`}>{friends.name}</a>
          </li>
        ))}
      </ul>
      <LogoutButton />
    </div>
  );
};

export default Home;
