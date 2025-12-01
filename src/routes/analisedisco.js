var express = require("express");
var router = express.Router();

var analisediscoController = require("../controllers/analisediscoController");

router.get(`/buscarnomemaquina/:idDac`, function (req, res) {
    analisediscoController.buscarnomemaquina(req, res);
});

router.get(`/buscarDadosDisco/:idDac`, function (req, res) {
    analisediscoController.buscarDadosDisco(req, res);
});

// router.get(`/buscarmetricasrammaquina/:idDac`, function (req, res) {
//     analiseramController.buscarmetricasrammaquina(req, res);
// });

// router.get(`/buscarmetricasrammaquinaunidade/:idUnidade`, function (req, res) {
//     analiseramController.buscarmetricasrammaquinaunidade(req, res);
// });

// router.get(`/puxardadosgraficoRAM/:idDac`, function (req, res) {
//     analiseramController.puxardadosgraficoRAM(req, res);
// });

// router.get(`/atualizardadosgraficoRAM/:idDac`, function (req, res) {
//     analiseramController.atualizardadosgraficoRAM(req, res);
// });

module.exports = router;