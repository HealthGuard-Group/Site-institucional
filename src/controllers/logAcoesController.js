var logAcoesModel = require("../models/logAcoesModel");

function registrar(req, res) {
    var fkUnidade = req.body.fkUnidadeAtendimento;
    var fkLogAcesso = req.body.fkLogAcesso;
    var fkUsuario = req.body.fkUsuario;

    var acao = req.body.acao;
    var statusAcao = req.body.statusAcao; 

    if (!fkUnidade || !fkLogAcesso || !fkUsuario || !acao || !statusAcao) {
        res.status(400).send("Campos obrigatórios não enviados");
        return;
    }

    logAcoesModel.registrar(fkUnidade, fkLogAcesso, fkUsuario, acao, statusAcao)
        .then(() => res.status(200).send("Ação registrada"))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

function listar(req, res) {
    logAcoesModel.listar()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => res.status(500).json(erro.sqlMessage));
}

module.exports = {
    registrar,
    listar
};
