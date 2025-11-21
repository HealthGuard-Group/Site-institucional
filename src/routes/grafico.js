var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/exibirInfoDac/:idDac", function (req, res) {
  graficoController.exibirInfoDac(req, res);
});

router.get("/buscarKpiDac/:idDac", function (req, res) {
  graficoController.buscarKpiDac(req, res);
});

module.exports = router;