var express = require("express");
var router = express.Router();

var acessosController = require("../controllers/acessosController");

router.get(`/buscarDadosLogs/:variaveis`, function (req, res) {
   acessosController.buscarDadosLogs(req, res);
});



module.exports = router;