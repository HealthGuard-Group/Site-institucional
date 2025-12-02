var express = require("express");
var router = express.Router();

var dashhgController = require("../controllers/dashhgController");
const { rankingChamados } = require("../models/dashhgModel");

router.get("/empresasCadastradas", function (req, res) {
  dashhgController.empresasCadastradas(req, res);
})

router.get("/quantidadeUsuarios", function (req, res) {
  dashhgController.quantidadeUsuarios(req, res);
})

router.get("/percentual", function (req, res) {
  dashhgController.percentual(req, res);
})

router.get("/usuariosDia", function (req, res) {
  dashhgController.usuariosDia(req, res);
})

router.get("/chamados", function (req, res) {
  dashhgController.chamados(req, res);
})

router.get("/rankingAlertas", function (req, res) {
  dashhgController.rankingAlertas(req, res);
})

router.get("/rankingChamados", function (req, res) {
  dashhgController.rankingChamados(req, res);
})




module.exports = router;