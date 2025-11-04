var convitesModel = require("../models/convitesModel");

function criarconvite(req, res) {
    var fkUnidade = req.body.fkUnidadeAtendimento;
    var codigo = req.body.codigo;
    var data = req.body.data;
    var permissao = req.body.fkpermissao;
    var nome = req.body.nome;
    var email = req.body.email;
    if (fkUnidade == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else if (data == undefined) {
        res.status(400).send("Seu data está undefined!");
    } else if (permissao == undefined) {
        res.status(400).send("Seu permissao está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

        convitesModel.criarconvite(fkUnidade, codigo, data, permissao, nome, email)
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
    criarconvite
}