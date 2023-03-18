import React, { useState, useEffect } from "react";
import axios from "axios";

const FriendRequests = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsName, setFriendsName] = useState([]);
    const getFriends = async () => {
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
    //   axios.all(requests).then((responses)=>{
    //     responses.forEach((response)=>{
    //       console.log(response.data[0].name);
    //       setFriendsName([...friendsName,response.data[0].name]);
    //     })
    //   })
    const responses = await Promise.all(requests);
    const users = responses.map((response) => response.data[0].name);
    setFriendsName(users);
    };

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
          `http://localhost:3000/api/v1/friends/searchId?query=` + currentUser;
        const res = await axios.get(url, config);
        setFriendRequests(res.data[0].friendRequestsReceived);
      } catch (error) {
        console.log(error);
      }
    };
    getFriendRequests();
    getFriends();
  },[]);

  const handleAccept = async (friendId, status) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const currentUser = localStorage.getItem("userid");
    const url = `http://localhost:3000/api/v1/friends/friend-request/` + currentUser;
    try {
      await axios.put(url, { friendId: friendId, accept: status }, config);
      setFriendRequests(
        friendRequests.filter((friend) => friend._id !== friendId)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {friendRequests.length !== 0 ? (
        friendRequests.map((friend, name) => (
          <div key={friend}>
            <p>{friendsName[name]} sent you a friend request</p>
            <button onClick={() => handleAccept(friend, true)}>
              Accept
            </button>
            <button onClick={() => handleAccept(friend, false)}>
              Delete
            </button>
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
