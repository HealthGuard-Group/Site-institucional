var analisecpuModel = require("../models/analisecpuModel");

function puxarProcessos(req, res) {
    var fkUNIDADE = req.params.fkunidade
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: ${fkUNIDADE}, DAC: ${fkDAC}`);
    
    if (fkUNIDADE == undefined) {
        res.status(400).send("FK unidade está undefined!");
    } else if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.puxarProcessos(fkUNIDADE, fkDAC)
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

function puxarThreads(req, res) {
    var fkUNIDADE = req.params.fkunidade
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: ${fkUNIDADE}, DAC: ${fkDAC}`);
    
    if (fkUNIDADE == undefined) {
        res.status(400).send("FK unidade está undefined!");
    } else if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.puxarThreads(fkUNIDADE, fkDAC)
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

function puxarCPU(req, res) {
    var fkUNIDADE = req.params.fkunidade
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: ${fkUNIDADE}, DAC: ${fkDAC}`);
    
    if (fkUNIDADE == undefined) {
        res.status(400).send("FK unidade está undefined!");
    } else if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.puxarCPU(fkUNIDADE, fkDAC)
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
function puxarAlertas(req, res) {
    var fkUNIDADE = req.params.fkunidade
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: ${fkUNIDADE}, DAC: ${fkDAC}`);
    
    if (fkUNIDADE == undefined) {
        res.status(400).send("FK unidade está undefined!");
    } else if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.puxarQtdAlertas(fkUNIDADE, fkDAC)
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

function puxarPorNucleo(req, res) {
    var fkUNIDADE = req.params.fkunidade
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: ${fkUNIDADE}, DAC: ${fkDAC}`);
    
    if (fkUNIDADE == undefined) {
        res.status(400).send("FK unidade está undefined!");
    } else if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.puxarPorNucleo(fkUNIDADE, fkDAC)
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

function puxarMetricas(req, res) {
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: DAC: ${fkDAC}`);
    
     if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.puxarMetricas(fkDAC)
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

function puxarDadosAlertas(req, res) {
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: DAC: ${fkDAC}`);
    
     if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.puxarDadosAlertas(fkDAC)
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

function iniciarpuxarporNucleo(req, res) {
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: DAC: ${fkDAC}`);
    
     if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.iniciarpuxarporNucleo(fkDAC)
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
    puxarProcessos,
    puxarThreads,
    puxarCPU,
    puxarAlertas,
    puxarPorNucleo,
    puxarMetricas,
    puxarDadosAlertas,
    iniciarpuxarporNucleo
}