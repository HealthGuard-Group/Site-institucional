var acessosModel = require("../models/acessosModel");

function buscarDados(req, res) {
    var fkUNIDADE = req.params.fkunidade

    if (fkUNIDADE == undefined) {
        res.status(400).send("FK unidade está undefined!"); 
    } else {
        acessosModel.buscarDados(fkUNIDADE)
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
    buscarDados
}