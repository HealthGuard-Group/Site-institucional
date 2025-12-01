var dashAlertasSemanaisModel = require("../models/dashAlertasSemanaisModel");

function buscarKpisSemana(req, res) {
    var idUnidadeAtendimento = req.params.idUnidadeAtendimento;
    if (!idUnidadeAtendimento) {
        res.status(400).send("idUnidadeAtendimento não definido!");
        return;
    }

    dashAlertasSemanaisModel.buscarKpisSemana(idUnidadeAtendimento)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar KPIs:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarAlertasPorSeveridade(req, res) {
    var idUnidadeAtendimento = req.params.idUnidadeAtendimento;
    if (!idUnidadeAtendimento) {
        res.status(400).send("ID da unidade não definido!");
        return;
    }

    dashAlertasSemanaisModel.buscarAlertasPorSeveridade(idUnidadeAtendimento)
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log("Erro ao buscar alertas por severidade: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = { 
    buscarKpisSemana,
    buscarAlertasPorSeveridade
};
