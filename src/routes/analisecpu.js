var express = require("express");
var router = express.Router();

var analiseramController = require("../controllers/analisecpuController");

router.get(`/puxardadosuser/:fkunidade/:fkdac`, function (req, res) {
    usuarioController.puxardados(req, res);
});



module.exports = router;