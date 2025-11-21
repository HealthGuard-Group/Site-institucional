var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/inseriracao", function (req, res) {
    usuarioController.inseriracao(req, res);
});
router.get("/buscarconvite/:codigo", function (req, res) {
    usuarioController.buscarconvite(req, res);
});
router.get("/verificarUsuario/:email", function (req, res) {
    usuarioController.verificarUsuario(req, res);
});
router.put("/atualizarcodigorecuperacao", function (req, res) {
    usuarioController.atualizarcodigorecuperacao(req, res);
});
router.post("/inserircodigorecuperacao", function (req, res) {
    usuarioController.inserircodigorecuperacao(req, res);
});
router.get("/verificarCodigo/:codigo", function (req, res) {
    usuarioController.verificarCodigo(req, res);
});
router.put("/atualizarsenha", function (req, res) {
    usuarioController.atualizarsenha(req, res);
});
router.get("/puxardadosuser/:id", function (req, res) {
    usuarioController.puxardadosuser(req, res);
});
router.put("/updatedados/", function (req, res) {
    usuarioController.updatedados(req, res);
});


module.exports = router;