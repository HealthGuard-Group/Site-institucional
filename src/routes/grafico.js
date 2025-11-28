var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/exibirInfoDac/:idDac", function (req, res) {
  graficoController.exibirInfoDac(req, res);
});

router.get("/buscarKpiDac/:idDac", function (req, res) {
  graficoController.buscarKpiDac(req, res);
});

router.get("/buscarMedicoesSelecionadas/:idDac", function (req, res) {
  graficoController.buscarMedicoesSelecionadas(req, res);
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

router.get("/buscarDisco/:idDac", function (req, res) {
  graficoController.buscarDisco(req, res);
})


router.get("/buscarRede/:idDac", function (req, res) {
  graficoController.buscarRede(req, res);
})

router.put("/excluirMaquina/:idDac", function (req, res) {
  console.log('entrou na rota')
  graficoController.excluirMaquina(req, res);
})

router.get("/puxarDadosGraficoDash/:idDac/:idMonitoramento", function (req, res) {
  graficoController.puxarDadosGraficoDash(req, res);
})

router.get("/atualizarDadosGraficoDashMonitoramento/:idDac/:idMonitoramento", function (req, res) {
  graficoController.atualizarDadosGraficoDashMonitoramento(req, res);
})

router.get("/mediaAlertas/:idDac/", function (req, res) {
  graficoController.mediaAlertas(req, res);
})

router.get("/tempoAtividade/:idDac/", function (req, res) {
  graficoController.tempoAtividade(req, res);
})

router.put("/ativarMaquina/:idDac", graficoController.ativarMaquina)

router.put("/inativarMaquina/:idDac", graficoController.inativarMaquina)

module.exports = router;