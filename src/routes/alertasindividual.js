var express = require("express");
var router = express.Router();

var alertasindividualController = require("../controllers/alertasindividualController");

router.get(`/puxarAlertasIndividual/:variaveis/:idDac`, function (req, res) {
   alertasindividualController.puxarAlertasIndividual(req, res);
});
router.put(`/marcarAlertaComoVerificado/:idAlerta`, function (req, res) {
   alertasindividualController.marcarAlertaComoVerificado(req, res);
});



module.exports = router;