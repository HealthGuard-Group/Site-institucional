var express = require("express");
var router = express.Router();

var dashhgController = require("../controllers/dashhgController");

router.get("/empresasCadastradas", function (req, res) {
  dashhgController.empresasCadastradas(req, res);
})

router.get("/quantidadeUsuarios", function (req, res) {
  dashhgController.quantidadeUsuarios(req, res);
})

router.get("/totalMaquinas", function (req, res) {
  dashhgController.totalMaquinas(req, res);
})

router.get("/usuariosDia", function (req, res) {
  dashhgController.usuariosDia(req, res);
})



module.exports = router;