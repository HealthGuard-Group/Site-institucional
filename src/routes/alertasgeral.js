var express = require("express");
var router = express.Router();

var alertasgeralController = require("../controllers/alertasgeralController");

router.get(`/puxarAlertasGeral/:variaveis`, function (req, res) {
   alertasgeralController.puxarAlertasGeral(req, res);
});



module.exports = router;