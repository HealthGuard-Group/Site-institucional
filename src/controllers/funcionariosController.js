var funcionariosModel = require("../models/funcionariosModel");


function buscarfuncionarios(req, res) {
    var fkUnidade = req.params.variaveis;
    if (fkUnidade == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {

        funcionariosModel.buscarfuncionarios(fkUnidade)
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
function validarconvite(req, res) {
    var emailVar = req.params.emailVar;
    if (emailVar == undefined) {
        res.status(400).send("Seu emailVar está undefined!");
    } else {

        convitesModel.validarconvite(emailVar)
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
function revogarconvites(req, res) {
    var id = req.body.id;
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        convitesModel.revogarconvites(id)
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
    buscarfuncionarios,
    // validarconvite,
    // revogarconvites
}