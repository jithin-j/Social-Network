import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const FriendRequestButton = ({ user }) => {
  const [isFriendRequestSent, setIsFriendRequestSent] = useState();
  useEffect(() => {
    const checkFriendRequest = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const currentUser = localStorage.getItem("userid");
        const url =
          "http://localhost:3000/api/v1/friends/searchId?query=" + currentUser;
        const response = await axios.get(url, config);
        console.log(response.data);
        console.log("Current user id: " + currentUser);
        console.log(response.data[0].name);
        console.log(user);
        if (response.data[0].friendRequestsSent.includes(user)) {
          setIsFriendRequestSent("pending");
          console.log("friend request pending");
        }
        if (response.data[0].friends.includes(user)) {
          setIsFriendRequestSent("friends");
          console.log("already friends");
        }
        if (
          !response.data[0].friendRequestsSent.includes(user) &&
          !response.data[0].friends.includes(user)
        ) {
          setIsFriendRequestSent("not friends");
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkFriendRequest();
  }, [user]);

  const sendFriendRequest = async () => {
    const token = localStorage.getItem("token");
    const sender = localStorage.getItem("userid");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const url = "http://localhost:3000/api/v1/friends/friend-request";
      await axios.post(url, { senderId: sender, recipientId: user }, config);
      setIsFriendRequestSent(true);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFriend = async () => {
    const token = localStorage.getItem("token");
    const curruser = localStorage.getItem("userid");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const url =
        "http://localhost:3000/api/v1/friends/remove-friend/" + curruser;
      axios.put(url, { friendId: user }, config);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {isFriendRequestSent === "pending" ? (
        <p>Friend Request Pending</p>
      ) : isFriendRequestSent === "friends" ? (
        <button onClick={removeFriend}>Remove Friend</button>
      ) : (
        <button onClick={sendFriendRequest}>Add Friend</button>
      )}
    </div>
  );
};

export default FriendRequestButton;
