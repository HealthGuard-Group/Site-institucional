var express = require("express");
var router = express.Router();

var logAcoesController = require("../controllers/logAcoesController");

router.post("/registrar", function (req, res) {
    logAcoesController.registrar(req, res);
});

router.get("/listar", function (req, res) {
    logAcoesController.listar(req, res);
});

module.exports = router;
