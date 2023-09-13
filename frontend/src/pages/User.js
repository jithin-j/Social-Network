import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import FriendRequestButton from "../components/FriendRequestButton";
import "./css/User.css";
import { Link } from "react-router-dom";
import userImg from "../images/user.png";
import backButton from "../images/back.png";

const User = () => {
  const { id } = useParams();
  localStorage.setItem("friendid", id);
  // const [userDetails, setUserDetails] = useState();
  const [mutualFriends, setMutualFriends] = useState([]);
  const [friendName, setFriendName] = useState("");
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

  useEffect(() => {
    const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const url = "http://localhost:3000/api/v1/friends/viewUser/" + localStorage.getItem("friendid");
    axios.get(url, config).then((res) => {
      setFriendName(res.data["name"]);
    });
    }
    fetchUser();
  }, [friendName])

  return (
    <div className="container3">
      <a href="/home"><img src={backButton} alt="backButton" className="backButton"/></a>
      <div className="container4">
        {/* {userDetails[0].name} */}
        <p className="userId">{friendName}</p>
        <div className="friendStatus"><FriendRequestButton user={id} /></div>
        <div>
          <p className="mutualFriendsHeading">Mutual friends: </p>
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
        {/* <a href="/home">Back to home</a> */}
      </div>
    </div>
  );
};

export default User;
