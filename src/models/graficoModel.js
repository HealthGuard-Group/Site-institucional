var database = require("../database/config");

function exibirInfoDac(idDac) {
  var instrucaoSql = `SELECT * FROM Dac WHERE idDac = ${idDac}`;

    return database.executar(instrucaoSql);
}


function buscarKpiDac(idDac) {
  var instrucaoSql = `SELECT md.nomeDaMedicao as componente, COUNT(a.idAlerta) AS totalAlertas FROM Alerta a 
  JOIN MedicoesDisponiveis md ON md.idMedicoesDisponiveis = a.fkMedicoesDisponiveis 
  WHERE fkDac = ${idDac} GROUP BY md.idMedicoesDisponiveis, md.nomeDaMedicao ORDER BY totalAlertas DESC LIMIT 1;`

    return database.executar(instrucaoSql);
}

function totalAlerta(idDac){
  var instrucaoSql = `
      select count(a.idAlerta) as totalAlertas from Alerta a
      where a.fkDac = ${idDac};
  `
  return database.executar(instrucaoSql);
}

module.exports = {
    exibirInfoDac,
    buscarKpiDac,
    totalAlerta
};