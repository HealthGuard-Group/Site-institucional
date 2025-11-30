var express = require("express");
var router = express.Router();

var analiseramController = require("../controllers/analiseramController");

router.get(`/buscarnomemaquina/:idDac`, function (req, res) {
    analiseramController.buscarnomemaquina(req, res);
});

router.get(`/buscarmemoria/:idDac`, function (req, res) {
    analiseramController.buscarmemoria(req, res);
});

router.get(`/buscarmetricasrammaquina/:idDac`, function (req, res) {
    analiseramController.buscarmetricasrammaquina(req, res);
});

router.get(`/buscarmetricasrammaquinaunidade/:idUnidade`, function (req, res) {
    analiseramController.buscarmetricasrammaquinaunidade(req, res);
});

router.get(`/puxardadosgraficoRAM/:idDac`, function (req, res) {
    analiseramController.puxardadosgraficoRAM(req, res);
});

router.get(`/atualizardadosgraficoRAM/:idDac`, function (req, res) {
    analiseramController.atualizardadosgraficoRAM(req, res);
});

router.get(`/buscarranking/:idDac`, function (req, res) {
    analiseramController.buscarranking(req, res);
});

router.get(`/buscarestresse/:idDac`, function (req, res) {
    analiseramController.buscarestresse(req, res);
});

router.put(`/atualizarRecomendacaoIA`, function (req, res) {
    analiseramController.atualizarRecomendacaoIA(req, res);
});

router.get(`/buscartextoIA/:idDac`, function (req, res) {
    analiseramController.buscartextoIA(req, res);
});

module.exports = router;