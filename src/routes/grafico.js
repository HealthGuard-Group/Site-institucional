var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/exibirInfoDac/:idDac", function (req, res) {
  graficoController.exibirInfoDac(req, res);
});

router.get("/buscarKpiDac/:idDac", function (req, res) {
  graficoController.buscarKpiDac(req, res);
});

router.get("/totalAlerta/:idDac", function (req, res) {
  graficoController.totalAlerta(req, res);
});

router.get("/buscarCpu/:idDac", function (req, res) {
  graficoController.buscarCpu(req, res);
})

router.get("/buscarRam/:idDac", function (req, res) {
  graficoController.buscarRam(req, res);
})

router.get("/buscarRede/:idDac", function (req, res) {
  graficoController.buscarRede(req, res);
})

module.exports = router;