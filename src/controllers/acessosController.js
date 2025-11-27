var acessosModel = require("../models/acessosModel");

function buscarDadosLogs(req, res) {
    var fkUNIDADE = req.params.variaveis

    if (fkUNIDADE == undefined) {
        res.status(400).send("FK unidade está undefined!"); 
    } else {
        acessosModel.buscarDadosLogs(fkUNIDADE)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a busca do convite! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarDadosLogs
}