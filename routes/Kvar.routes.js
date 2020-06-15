var express = require("express");
var router = express.Router();

const bodyparser = require("body-parser");

const Controller = require("../controllers/Kvar.controller")


router.post('/add', bodyparser.json(), Controller.add);

router.get('/get', Controller.getAll);


module.exports = router;
