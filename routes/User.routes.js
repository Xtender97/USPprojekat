var express = require("express");
var router = express.Router();

const bodyparser = require("body-parser");

const UserController = require("../controllers/User.controller")


router.post('/register', bodyparser.json(), UserController.register);

router.post('/login', bodyparser.json(), UserController.login);


module.exports = router;
