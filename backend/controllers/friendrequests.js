const User = require("../models/User");

const friendrequest = async (req, res) => {
  const { senderId, recipientId } = req.body;
  try {
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the recipient to the sender's friendRequestsSent array
    sender.friendRequestsSent.push(recipient._id);

    // Add the sender to the recipient's friendRequestsReceived array
    recipient.friendRequestsReceived.push(sender._id);

    // Save the updated sender and recipient documents
    await sender.save();
    await recipient.save();

    return res
      .status(200)
      .json({ message: "Friend request sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const friendrequestAccept = async (req, res) => {
  const { userId } = req.params;
  const { friendId, accept } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the friend from the user's friendRequestsReceived array
    user.friendRequestsReceived = user.friendRequestsReceived.filter(
      (request) => request.toString() !== friendId
    );
    friend.friendRequestsSent = friend.friendRequestsSent.filter(
      (request) => request.toString() !== userId
    );

    if (accept) {
      // Add the friend to the user's friends array
      user.friends.push(friendId);
      // Add the user to the friend's friends array
      friend.friends.push(userId);

      // Save the updated user and friend documents
      await user.save();
      await friend.save();

      return res.status(200).json({ message: "Friend request accepted" });
    } else {
      // Save the updated user document
      await user.save();

      return res.status(200).json({ message: "Friend request rejected" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const removeFriend = async (req, res) => {
  const { userId } = req.params;
  const { friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the friend from the user's friends array
    user.friends = user.friends.filter(
      (friend) => friend.toString() !== friendId
    );
    // Remove the user from the friend's friends array
    friend.friends = friend.friends.filter(
      (friend) => friend.toString() !== userId
    );

    // Save the updated user and friend documents
    await user.save();
    await friend.save();

    return res.status(200).json({ message: "Friend removed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const mutualFriends = async (req, res) => {
  const { userId } = req.params;
  const { otherUserId } = req.params;
  try {
    const user = await User.findById(userId).populate("friends");
    const otherUser = await User.findById(otherUserId).populate("friends");

    if (!user || !otherUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const mutualFriends = user.friends.filter((friend) => {
      return otherUser.friends.find(
        (otherFriend) => otherFriend._id.toString() === friend._id.toString()
      );
    });

    return res.status(200).json({ mutualFriends });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const viewFriends = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by their id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve the user's friends based on their ids
    const friends = await User.find({ _id: { $in: user.friends } });

    res.status(200).json(friends);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const viewUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

const search = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({ name: query });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const searchById = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({ _id: query });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const viewFriendRequests = async (req, res) => {
    const { userId } = req.params;
    try {
      // Find the user by their id
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Retrieve the user's friends based on their ids
      const friends = await User.find({ _id: { $in: user.friendRequestsReceived } });

      res.status(200).json(friends);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
  friendrequest,
  friendrequestAccept,
  removeFriend,
  mutualFriends,
  viewFriends,
  search,
  searchById,
  viewFriendRequests,
  viewUser,
};
