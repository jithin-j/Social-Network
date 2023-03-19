import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoutButton from "../components/LogoutButton";
import { Link } from "react-router-dom";
import "./css/Home.css";
import userImg from "../images/user.png"

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
    <div className="container">
      <div className="buttons">
        <Link to="/users/search">
          {" "}
          <button>
            <span>Search for friends</span>
          </button>
        </Link>
        <Link to={friendRequestsURL}>
          {" "}
          <button>
            <span>Friend Requests</span>
          </button>
        </Link>
        <LogoutButton />
      </div>
      <div className="friends-box">
        <div className="left-side">
          <p>My Friends</p>
          <div className="lottie">
            <lottie-player
              src="https://assets6.lottiefiles.com/packages/lf20_f2jo61ci.json"
              background="transparent"
              speed="1"
              style={{ width: "500px", height: "500px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
        <div className="right-side">
          <ul>
            {friends.map((friends) => (
              <li key={friends._id}>
                <Link to={`/friends/${friends._id}`}>
                  <div className="usercard">
                    <img src={userImg} alt="profile" />
                    <a href={`/friends/${friends._id}`}>{friends.name}</a>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
