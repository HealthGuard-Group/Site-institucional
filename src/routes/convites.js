var express = require("express");
var router = express.Router();

var convitesController = require("../controllers/convitesController");

router.post("/criarconvite", function (req, res) {
  convitesController.criarconvite(req, res);
});
router.get("/buscarconvites/:variaveis", function (req, res) {
  convitesController.buscarconvites(req, res);
});

module.exports = router;