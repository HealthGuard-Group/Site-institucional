var express = require("express");
var router = express.Router();

var funcionariosController = require("../controllers/funcionariosController");

router.get("/buscarfuncionarios/:variaveis", function (req, res) {
  funcionariosController.buscarfuncionarios(req, res);
});
router.put("/atualizarpermissao/:idUsuario", function (req, res) {
  funcionariosController.atualizarpermissao(req, res);
});
router.put("/excluirfuncionario/:idUsuario", function (req, res) {
  funcionariosController.excluirfuncionario(req, res);
});
// router.get("/validarconvite/:emailVar", function (req, res) {
//   funcionariosController.validarconvite(req, res);
// });
// router.put("/revogarfuncionarios", function (req, res) {
//   funcionariosController.revogarfuncionarios(req, res);
// });

module.exports = router;