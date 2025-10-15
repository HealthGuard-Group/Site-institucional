var database = require("../database/config");

function buscarLogAcesso(fkUnidade, fkUsuario) {
  var instrucaoSql = `SELECT idLogAcesso FROM logAcesso WHERE fkUnidadeDeAtendimento = ${fkUnidade} AND fkUsuario = ${fkUsuario} ORDER BY idLogAcesso DESC LIMIT 1;`;

  return database.executar(instrucaoSql);
}
function buscarNomeDaUnidade(fkUnidade) {
  var instrucaoSql = `SELECT nomeFantasia,razaoSocial FROM UnidadeDeAtendimento WHERE idUnidadeDeAtendimento = ${fkUnidade};`;
  return database.executar(instrucaoSql);
}
function buscarMaquina(fkUnidade) {
  var instrucaoSql = `SELECT nomeDeIdentificacao,statusDac,idDac FROM Dac WHERE fkUnidadeDeAtendimento = ${fkUnidade};`;
  return database.executar(instrucaoSql);
}
function buscarKpisMonitoramento(fkUnidade) {
  var instrucaoSql = `select (select COUNT(idDac) FROM Dac WHERE statusDac = "Em configuração") as "configuracao",
	(select COUNT(idDac) FROM Dac WHERE statusDac = "Ativo") as "ativo",
	(select COUNT(idDac) FROM Dac WHERE statusDac = "Inativo") as "inativo",
	(select COUNT(idDac) FROM Dac WHERE statusDac = "Alerta") as "alerta",
	(select COUNT(idDac) FROM Dac WHERE statusDac != "Em configuração") as "cadastradas"
    FROM Dac WHERE fkUnidadeDeAtendimento = ${fkUnidade} limit 1;`;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarLogAcesso,
  buscarNomeDaUnidade,
  buscarMaquina,
  buscarKpisMonitoramento
};