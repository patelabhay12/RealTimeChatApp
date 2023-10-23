const controller = require("../controllers/userController.js");
const express = require('express');

const router = express.Router();



router.post("/register", controller.register);
router.post("/login", controller.login);
router.post('/avatar/:id', controller.Setavatar);
router.get('/allusers/:id', controller.getAllUsers);
    
module.exports = router;  