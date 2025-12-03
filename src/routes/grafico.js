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

router.get("/alertasCpu/:idDac", function (req, res) {
  graficoController.alertasCpu(req, res);
});

router.get("/alertasRam/:idDac", function (req, res) {
  graficoController.alertasRam(req, res);
});

router.get("/alertasDisco/:idDac", function (req, res) {
  graficoController.alertasDisco(req, res);
});

router.get("/duracaoAlertaCpu/:idDac", function (req, res) {
  graficoController.duracaoAlertaCpu(req, res);
});

router.get("/duracaoAlertaRam/:idDac", function (req, res) {
  graficoController.duracaoAlertaRam(req, res);
});

router.get("/duracaoAlertaDisco/:idDac", function (req, res) {
  graficoController.duracaoAlertaDisco(req, res);
});

router.get("/cpu24h/:idDac", function (req, res) {
  graficoController.cpu24h(req, res);
});

router.get("/ram24h/:idDac", function (req, res) {
  graficoController.ram24h(req, res);
});

router.get("/disco24h/:idDac", function (req, res) {
  graficoController.disco24h(req, res);
});

router.get("/puxarDadosGraficoAlerta/:idDac/:idMonitoramento", function (req, res) {
  graficoController.puxarDadosGraficoAlerta(req, res);
});

router.get("/metricacpu/:idDac", function (req, res) {
  graficoController.metricacpu(req, res);
});

router.get("/metricaram/:idDac", function (req, res) {
  graficoController.metricaram(req, res);
});

router.get("/metricadisco/:idDac", function (req, res) {
  graficoController.metricadisco(req, res);
});

router.get("/puxarAlertasNaoVistos/:idDac", function (req, res) {
  graficoController.puxarAlertasNaoVistos(req, res);
});

router.get("/puxandoMetricaPadraoDac/:idDac/:idMonitoramento", function (req, res) {
  graficoController.puxandoMetricaPadraoDac(req, res);
});

router.get("/puxandoMetricaPadrao/:idUnidadeAtendimento/:idMonitoramento", function (req, res) {
  graficoController.puxandoMetricaPadrao(req, res);
});

router.get("/puxandoServicosSelecionados/:idDac", function (req, res) {
  graficoController.puxandoServicosSelecionados(req, res);
});

router.delete("/deletandoServicos", function (req, res) {
  graficoController.deletandoServicos(req, res);
});


module.exports = router;