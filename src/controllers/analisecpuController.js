var analisecpuModel = require("../models/analisecpuModel");

function puxardados(req, res) {
    var fkUNIDADE = req.params.fkunidade
    var fkDAC = req.params.fkdac

    console.log(`Debug: Chegou no controller. Unidade: ${fkUNIDADE}, DAC: ${fkDAC}`);
    
    if (fkUNIDADE == undefined) {
        res.status(400).send("FK unidade está undefined!");
    } else if (fkDAC == undefined) {
        res.status(400).send("FK dac está undefined!");
    } else {
        analisecpuModel.puxardados(fkUNIDADE, fkDAC)
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
    puxardados
}