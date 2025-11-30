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


module.exports = router;