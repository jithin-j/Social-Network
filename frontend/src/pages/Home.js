import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";

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
  return (
    <div>
      <h1>My Friends</h1>
      <ul>
        {friends.map((friends) => (
          <li key={friends._id}>
            <a href={`/friends/${friends._id}`}>{friends.name}</a>
          </li>
        ))}
      </ul>
      <LogoutButton/>
    </div>
  );
};

export default Home;
