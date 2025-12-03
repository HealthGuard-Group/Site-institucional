var analisediscoModel = require("../models/analisediscoModel");

function buscarnomemaquina(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analisediscoModel.buscarnomemaquina(idDac)
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

function buscarDadosDisco(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analisediscoModel.buscarDadosDisco(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar dados de disco! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarUltimasVariacoesUsoDisco(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        analisediscoModel.buscarUltimasVariacoesUsoDisco(idDac)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar a VARIAÇÕES DE USO DO DISCO! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

// function buscarmetricasrammaquina(req, res) {
//     var idDac = req.params.idDac;
//     if (idDac == undefined) {
//         res.status(400).send("Seu idDac está undefined!");
//     } else {

//         analiseramModel.buscarmetricasrammaquina(idDac)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao puxar a métrica de RAM! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

// function buscarmetricasrammaquinaunidade(req, res) {
//     var idUnidade = req.params.idUnidade;
//     if (idUnidade == undefined) {
//         res.status(400).send("Seu idDac está undefined!");
//     } else {

//         analiseramModel.buscarmetricasrammaquinaunidade(idUnidade)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao puxar a métrica de RAM! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }


// function atualizardadosgraficoRAM(req, res) {
//     var idDac = req.params.idDac;
//     if (idDac == undefined) {
//         res.status(400).send("Seu idDac está undefined!");
//     } else {

//         analiseramModel.atualizardadosgraficoRAM(idDac)
//             .then(
//                 function (resultado) {
//                     res.json(resultado);
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao puxar a atualização dados de RAM e SWAP! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

module.exports = {
    buscarnomemaquina,
    buscarDadosDisco,
    buscarUltimasVariacoesUsoDisco
    // buscarmetricasrammaquina,
    // buscarmetricasrammaquinaunidade,
    // puxardadosgraficoRAM,
    // atualizardadosgraficoRAM
}