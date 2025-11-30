var express = require("express");
var router = express.Router();

var dashAlertasSemanaisController = require("../controllers/dashAlertasSemanaisController");

router.get("/kpis/:idUnidadeAtendimento", dashAlertasSemanaisController.buscarKpisSemana);

module.exports = router;
