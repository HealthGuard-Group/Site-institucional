var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarLogAcesso/:fkUnidade/:fkUsuario", function (req, res) {
  dashboardController.buscarLogAcesso(req, res);
});
router.get("/buscarNomeDaUnidade/:fkUnidade", function (req, res) {
  dashboardController.buscarNomeDaUnidade(req, res);
});
router.get("/buscarMaquina/:fkUnidade", function (req, res) {
  dashboardController.buscarMaquina(req, res);
});
router.get("/buscarKpisMonitoramento/:fkUnidade", function (req, res) {
  dashboardController.buscarKpisMonitoramento(req, res);
});
router.get("/buscarMetricasPadrao/:fkUnidade", function (req, res) {
  dashboardController.buscarMetricasPadrao(req, res);
});

module.exports = router;
