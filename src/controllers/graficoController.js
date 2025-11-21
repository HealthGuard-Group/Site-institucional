var graficoModel = require("../models/graficoModel");


function exibirInfoDac(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        graficoModel.exibirInfoDac(idDac)
            .then(
                function (resultado) {
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

function buscarKpiDac(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        graficoModel.buscarKpiDac(idDac)
            .then(
                function (resultado) {
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
    exibirInfoDac,
    buscarKpiDac
}