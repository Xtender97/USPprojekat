var express = require("express");
var router = express.Router();

const bodyparser = require("body-parser");

const Controller = require("../controllers/Pretplatnik.controller")


router.post('/add', bodyparser.json(), Controller.add);


module.exports = router;
