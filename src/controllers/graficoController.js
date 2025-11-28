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

function buscarMedicoesSelecionadas(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        graficoModel.buscarMedicoesSelecionadas(idDac)
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

function totalAlerta(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        graficoModel.totalAlerta(idDac)
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

function buscarCpu(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        graficoModel.buscarCpu(idDac)
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

function buscarRam(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        graficoModel.buscarRam(idDac)
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

function buscarDisco(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        graficoModel.buscarDisco(idDac)
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



function buscarRede(req, res) {
    var idDac = req.params.idDac;
    if (idDac == undefined) {
        res.status(400).send("Seu idDac está undefined!");
    } else {

        graficoModel.buscarRede(idDac)
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
function excluirMaquina(req, res) {
    var idDac = req.params.idDac

    if (idDac == undefined) {
        res.status(400).send("IdDac está undefined!");
    } else {
        graficoModel.excluirMaquina(idDac)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao remover maquina! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}
function puxarDadosGraficoDash(req, res) {
    var idDac = req.params.idDac
    var idMonitoramento = req.params.idMonitoramento

    if (idDac == undefined) {
        res.status(400).send("IdDac está undefined!");
    } else if (idMonitoramento == undefined) {
        res.status(400).send("idMonitoramento está undefined!");
    } else {
        graficoModel.puxarDadosGraficoDash(idDac, idMonitoramento)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao puxar os dados da dashboard! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}
function atualizarDadosGraficoDashMonitoramento(req, res) {
    var idDac = req.params.idDac
    var idMonitoramento = req.params.idMonitoramento

    if (idDac == undefined) {
        res.status(400).send("IdDac está undefined!");
    } else if (idMonitoramento == undefined) {
        res.status(400).send("idMonitoramento está undefined!");
    } else {
        graficoModel.atualizarDadosGraficoDashMonitoramento(idDac, idMonitoramento)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao atualizar os dados da dashboard! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function tempoAtividade(req, res) {
    var idDac = req.params.idDac

    if (idDac == undefined) {
        res.status(400).send("IdDac está undefined!");
    } 
    else {
        graficoModel.tempoAtividade(idDac)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao atualizar os dados da dashboard! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function mediaAlertas(req, res) {
    var idDac = req.params.idDac
    if (idDac == undefined) {
        res.status(400).send("IdDac está undefined!");
    } 
    else {
        graficoModel.mediaAlertas(idDac)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao atualizar os dados da dashboard! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
    }
}

function ativarMaquina(req, res) {
    var idDac = req.params.idDac;

    graficoModel.ativarMaquina(idDac)
        .then(() => res.status(200).send("Ativo"))
        .catch((erro) => {
            console.log("ERRO ATIVAR:", erro);
            res.status(500).json(erro);
        });
}

function inativarMaquina(req, res) {
    var idDac = req.params.idDac;

    graficoModel.inativarMaquina(idDac)
        .then(() => res.status(200).send("Inativo"))
        .catch((erro) => {
            console.log("ERRO INATIVAR:", erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    exibirInfoDac,
    buscarKpiDac,
    buscarMedicoesSelecionadas,
    totalAlerta,
    buscarCpu,
    buscarRam,
    buscarDisco,
    buscarRede,
    excluirMaquina,
    puxarDadosGraficoDash,
    atualizarDadosGraficoDashMonitoramento,
    tempoAtividade,
    mediaAlertas,
    ativarMaquina,
    inativarMaquina
}