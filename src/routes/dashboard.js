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
router.get("/buscarcodigos/:variaveis", function (req, res) {
  dashboardController.buscarcodigos(req, res);
});
router.post("/inserirmaquina", function (req, res) {
  dashboardController.inserirmaquina(req, res);
});
router.post("/inserirmaquinaservicos", function (req, res) {
  dashboardController.inserirmaquinaservicos(req, res);
});
router.post("/inserirmaquinametricaspersonalizadas", function (req, res) {
  dashboardController.inserirmaquinametricaspersonalizadas(req, res);
});
router.get("/puxarNome/:fkUnidade", function (req, res) {
  dashboardController.puxarNome(req, res);
});

module.exports = router;
