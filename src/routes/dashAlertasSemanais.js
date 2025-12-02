var express = require("express");
var router = express.Router();

var dashAlertasSemanaisController = require("../controllers/dashAlertasSemanaisController");

router.get("/kpis/:idUnidadeAtendimento", dashAlertasSemanaisController.buscarKpisSemana);

router.get("/severidade/:idUnidadeAtendimento", dashAlertasSemanaisController.buscarAlertasPorSeveridade);

router.get("/ranking/:idUnidadeAtendimento", dashAlertasSemanaisController.buscarRankingMaquinas);

router.get("/semana/:idUnidadeAtendimento", dashAlertasSemanaisController.buscarAlertaSemana);


module.exports = router;
