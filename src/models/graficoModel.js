var database = require("../database/config");

function exibirInfoDac(idDac) {
  var instrucaoSql = `SELECT * FROM Dac WHERE idDac = ${idDac}`;

    return database.executar(instrucaoSql);
}

module.exports = {
    exibirInfoDac
};