var express = require("express");
var router = express.Router();

var acessosController = require("../controllers/acessosController");

router.get(`/buscarDados/:fkunidade/`, function (req, res) {
   acessosController.buscarDados(req, res);
});



module.exports = router;