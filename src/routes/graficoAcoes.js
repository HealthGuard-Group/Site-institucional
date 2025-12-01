const express = require("express");
const router = express.Router();
const controller = require("../controllers/graficoAcoesController");

router.get("/listar", controller.listar);
router.get("/carga/:idUnidade", controller.carga);
router.get("/tipos/:idUnidade", controller.tipos);
router.get("/usuarios/:idUnidade", controller.usuarios);

module.exports = router;
