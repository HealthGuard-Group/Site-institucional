var express = require("express");
var router = express.Router();

var analisecpuController = require("../controllers/analisecpuController");

router.get(`/puxardados/:fkunidade/:fkdac`, function (req, res) {
    analisecpuController.puxardados(req, res);
});



module.exports = router;