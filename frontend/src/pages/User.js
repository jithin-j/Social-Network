import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import FriendRequestButton from "../components/FriendRequestButton";

const User = () => {
  const { id } = useParams();
  localStorage.setItem("friendid", id);
  const [mutualFriends, setMutualFriends] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const cid = localStorage.getItem("userid");
    const fid = localStorage.getItem("friendid");
    const url = "http://localhost:3000/api/v1/friends/mutual-friends/" + cid + "/" + fid;
    axios.get(url, config).then((res) => {
      setMutualFriends(res.data['mutualFriends']);
      console.log(res.data['mutualFriends']);
    });
  },[])
  return (
    <div>
      User {id}
      <FriendRequestButton user={id}/>
      <h3>Mutual friends: </h3>
      <ul>
        {mutualFriends.map((mutualFriend) => (
          <li key={mutualFriend._id}>
            <a href={`/friends/${mutualFriend._id}`}>{mutualFriend.name}</a>
          </li>
        ))}
      </ul>
      <a href="/home">Back to home</a>
    </div>
  );
};

export default User;
