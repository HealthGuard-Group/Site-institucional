var kpiModel = require("../models/kpisAcoesModel");

function listar(req, res) {
    kpiModel.listar()
        .then(function(resultado) {
         
            res.status(200).json(resultado);
        })
        .catch(function(erro) {
            res.status(500).json({ erro: erro.sqlMessage });
        });
}

module.exports = {
    listar
};
