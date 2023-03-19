import React, { useState, useEffect } from "react";
import axios from "axios";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsName, setFriendsName] = useState([]);
  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const currentUser = localStorage.getItem("userid");
        const url =
          `http://localhost:3000/api/v1/friends/viewFriendRequests/` +
          currentUser;
        const res = await axios.get(url, config);
        setFriendRequests(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriendRequests();
  }, []);
  const getFriendsName = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const requests = friendRequests.map((friend) =>
      axios.get(
        `http://localhost:3000/api/v1/friends/searchId?query=` + friend,
        config
      )
    );
    axios.all(requests).then((responses) => {
      responses.forEach((response) => {
        console.log(response.data[0].name);
        setFriendsName([...friendsName, response.data[0].name]);
      });
    });
  };
  const handleAccept = async (friendId, status) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const currentUser = localStorage.getItem("userid");
    const url =
      `http://localhost:3000/api/v1/friends/friend-request/` + currentUser;
    try {
      await axios.put(url, { friendId: friendId, accept: status }, config);
      setFriendRequests(
        friendRequests.filter((friend) => friend._id !== friendId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  // getFriendsName();
  console.log(friendRequests);
  return (
    <div>
      {friendRequests.length !== 0 ? (
        friendRequests.map((friend) => (
          <div key={friend.name}>
            <p>{friend.name} sent you a friend request</p>
            <button onClick={() => handleAccept(friend._id, true)}>Accept</button>
            <button onClick={() => handleAccept(friend._id, false)}>Delete</button>
          </div>
        ))
      ) : (
        <>
          <p>No friend requests</p>
          <a href="/home">Go back to home</a>
        </>
      )}
    </div>
  );
};

export default FriendRequests;
