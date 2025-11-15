var express = require("express");
var router = express.Router();

var convitesController = require("../controllers/convitesController");

router.post("/criarconvite", function (req, res) {
  convitesController.criarconvite(req, res);
});
router.get("/buscarconvites/:variaveis", function (req, res) {
  convitesController.buscarconvites(req, res);
});
router.get("/validarconvite/:emailVar", function (req, res) {
  convitesController.validarconvite(req, res);
});
router.put("/revogarconvites", function (req, res) {
  convitesController.revogarconvites(req, res);
});

module.exports = router;