const express = require("express");
const router = express.Router();

const {
  friendrequest,
  friendrequestAccept,
  removeFriend,
  mutualFriends,
  viewFriends,
  search,
  searchById,
  viewFriendRequests, 
  viewUser
} = require("../controllers/friendrequests");

router.post("/friend-request", friendrequest);
router.put("/friend-request/:userId", friendrequestAccept);
router.put("/remove-friend/:userId", removeFriend);
router.get("/mutual-friends/:userId/:otherUserId", mutualFriends);
router.get("/view-friends/:userId", viewFriends);
router.get("/search", search);
router.get("/searchId", searchById);
router.get("/viewFriendRequests/:userId", viewFriendRequests);
router.get("/viewUser/:userId", viewUser);

module.exports = router;
