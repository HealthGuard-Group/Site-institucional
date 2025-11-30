var alertasgeralModel = require("../models/alertasgeralModel");

function puxarAlertasGeral(req, res) {
    var fkUnidade = req.params.variaveis

    if (fkUnidade == undefined) {
        res.status(400).send("FK unidade está undefined!"); 
    } else {
        alertasgeralModel.puxarAlertasGeral(fkUnidade)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a busca do alerta! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function marcarAlertaComoVerificado(req, res) {
    var idAlerta = req.params.idAlerta;
    var dataVisualizacao = req.body.dataVisualizacao;
    var nomeVisualizador = req.body.nomeVisualizador

    if (idAlerta == undefined) {
        res.status(400).send("Seu idAlerta está undefined!");
    } else {

        alertasgeralModel.marcarAlertaComoVerificado(idAlerta, dataVisualizacao, nomeVisualizador)
            .then(
                function (resultado) {
                    console.log(resultado);
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao inserir log! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    puxarAlertasGeral,
    marcarAlertaComoVerificado
}