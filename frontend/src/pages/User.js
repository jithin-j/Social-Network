import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import FriendRequestButton from "../components/FriendRequestButton";
import "./css/User.css";
import { Link } from "react-router-dom";
import userImg from "../images/user.png";

const User = () => {
  const { id } = useParams();
  localStorage.setItem("friendid", id);
  // const [userDetails, setUserDetails] = useState();
  const [mutualFriends, setMutualFriends] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const cid = localStorage.getItem("userid");
      const fid = localStorage.getItem("friendid");
      const url =
        "http://localhost:3000/api/v1/friends/mutual-friends/" +
        cid +
        "/" +
        fid;
      axios.get(url, config).then((res) => {
        setMutualFriends(res.data["mutualFriends"]);
      });
      // console.log(res.data["mutualFriends"]);
    };
    fetchData();
  }, []);
  return (
    <div className="container3">
      <div className="container4">
        {/* {userDetails[0].name} */}
        User {id}
        <FriendRequestButton user={id} />
        <div>
          <p>Mutual friends: </p>
          <ul>
            {mutualFriends.map((mutualFriend) => (
              <li key={mutualFriend._id}>
                {/* <a href={`/friends/${mutualFriend._id}`}>{mutualFriend.name}</a> */}
                <Link to={`/friends/${mutualFriend._id}`}>
                  <div className="usercard2">
                    <img src={userImg} alt="profile" />
                    <a href={`/friends/${mutualFriend._id}`}>
                      {mutualFriend.name}
                    </a>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <a href="/home">Back to home</a>
      </div>
    </div>
  );
};

export default User;
