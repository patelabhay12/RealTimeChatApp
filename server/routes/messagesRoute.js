const controller = require("../controllers/messagesController.js");
const express = require('express');
const router = express.Router();

router.post("/addmsg/", controller.addMessage);
router.post("/getmsg/", controller.getAllMessages);


module.exports = router;  