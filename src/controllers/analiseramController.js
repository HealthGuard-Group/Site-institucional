var analiseramModel = require("../models/analiseramModel");

function buscarnomemaquina(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analiseramModel.buscarnomemaquina(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar o nome da máquina! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarmemoria(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analiseramModel.buscarmemoria(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar a memória! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarmetricasrammaquina(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analiseramModel.buscarmetricasrammaquina(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar a métrica de RAM! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarmetricasrammaquinaunidade(req, res) {
    var idUnidade = req.params.idUnidade;
    if (idUnidade == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analiseramModel.buscarmetricasrammaquinaunidade(idUnidade)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar a métrica de RAM! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function puxardadosgraficoRAM(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analiseramModel.puxardadosgraficoRAM(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar a dados de RAM e SWAP! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizardadosgraficoRAM(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analiseramModel.atualizardadosgraficoRAM(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar a atualização dados de RAM e SWAP! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarranking(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analiseramModel.buscarranking(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar a atualização dados de RAM e SWAP! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarestresse(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analiseramModel.buscarestresse(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar a atualização dados de RAM e SWAP! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarnomemaquina,
    buscarmemoria,
    buscarmetricasrammaquina,
    buscarmetricasrammaquinaunidade,
    puxardadosgraficoRAM,
    atualizardadosgraficoRAM,
    buscarranking,
    buscarestresse
}