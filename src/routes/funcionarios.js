var express = require("express");
var router = express.Router();

var convitesController = require("../controllers/funcionariosController");

router.get("/buscarfuncionarios/:variaveis", function (req, res) {
  convitesController.buscarfuncionarios(req, res);
});
// router.get("/validarconvite/:emailVar", function (req, res) {
//   convitesController.validarconvite(req, res);
// });
// router.put("/revogarconvites", function (req, res) {
//   convitesController.revogarconvites(req, res);
// });

module.exports = router;