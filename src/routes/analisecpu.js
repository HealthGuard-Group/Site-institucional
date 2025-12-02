var express = require("express");
var router = express.Router();

var analisecpuController = require("../controllers/analisecpuController");

router.get(`/puxarprocessos/:fkunidade/:fkdac`, function (req, res) {
    analisecpuController.puxarProcessos(req, res);
});
router.get(`/puxarThreads/:fkunidade/:fkdac`, function (req, res) {
    analisecpuController.puxarThreads(req, res);
});
router.get(`/puxarCPU/:fkunidade/:fkdac`, function (req, res) {
    analisecpuController.puxarCPU(req, res);
});
router.get(`/puxarQtdAlertas/:fkunidade/:fkdac`, function (req, res) {
    analisecpuController.puxarAlertas(req, res);
});
router.get(`/puxarporNucleo/:fkunidade/:fkdac`, function (req, res) {
    analisecpuController.puxarPorNucleo(req, res);
});
router.get(`/puxarMetricas/:fkdac`, function (req, res) {
    analisecpuController.puxarMetricas(req, res);
});

router.get(`/puxarALERTAS/:fkdac`, function (req, res) {
    analisecpuController.puxarDadosAlertas(req, res);
});

router.get(`/iniciarpuxarporNucleo/:fkdac`, function (req, res) {
    analisecpuController.iniciarpuxarporNucleo(req, res);
});



module.exports = router;