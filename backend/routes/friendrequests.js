const express = require("express");
const router = express.Router();

const { friendrequest, friendrequestAccept, removeFriend, mutualFriends, viewFriends } = require("../controllers/friendrequests");

router.post("/friend-request", friendrequest);
router.put("/friend-request/:userId", friendrequestAccept);
router.put("/remove-friend/:userId", removeFriend);
router.get("/mutual-friends/:userId", mutualFriends);
router.get("/view-friends/:userId", viewFriends);

module.exports = router;