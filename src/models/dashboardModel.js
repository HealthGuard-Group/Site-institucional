var database = require("../database/config");

function buscarLogAcesso(fkUnidade, fkUsuario) {
  var instrucaoSql = `SELECT idLogAcesso FROM LogAcesso WHERE fkUnidadeDeAtendimento = ${fkUnidade} AND fkUsuario = ${fkUsuario} ORDER BY idLogAcesso DESC LIMIT 1;`;

  return database.executar(instrucaoSql);
}
function buscarNomeDaUnidade(fkUnidade) {
  var instrucaoSql = `SELECT nomeFantasia,razaoSocial FROM UnidadeDeAtendimento WHERE idUnidadeDeAtendimento = ${fkUnidade};`;
  return database.executar(instrucaoSql);
}
function buscarMaquina(fkUnidade) {
  var instrucaoSql = `SELECT nomeIdentificacao,statusDac,idDac FROM Dac WHERE fkUnidadeDeAtendimento = ${fkUnidade};`;
  return database.executar(instrucaoSql);
}
function buscarKpisMonitoramento(fkUnidade) {
  var instrucaoSql = `select (select COUNT(idDac) FROM Dac WHERE statusDac = "Em configuração") as "configuracao",
	(select count(idDac) from Dac where statusDac = 'Ativo' or statusDac = 'Alerta') as "ativo",
	(select COUNT(idDac) FROM Dac WHERE statusDac = "Inativo") as "inativo",
	(select COUNT(idDac) FROM Dac WHERE statusDac = "Alerta") as "alerta",
	(select count(idDac) from Dac where statusDac != "Em configuração" and statusDac != "Excluído") as "cadastradas"
    FROM Dac WHERE fkUnidadeDeAtendimento = ${fkUnidade} limit 1;`;
  return database.executar(instrucaoSql);
}
function buscarMetricasPadrao(fkUnidade) {
  var instrucaoSql = `SELECT fkMedicoesDisponiveis,nomeNivel,valorMinimo,valorMaximo FROM MetricaAlerta WHERE fkUnidadeDeAtendimento = ${fkUnidade} AND fkDac IS NULL;`;
  return database.executar(instrucaoSql);
}
async function inserirmaquina(maquina_nova, idUnidadeAtendimento) {
  console.log(maquina_nova)
  var insert = `INSERT INTO Dac(fkUnidadeDeAtendimento,nomeIdentificacao,codigoValidacao) VALUES (${idUnidadeAtendimento},'${maquina_nova.nome}','${maquina_nova.codigo}');`;
  var insert2 = `INSERT INTO HealthGuard.CodigoConfiguracaoMaquina (fkUnidadeDeAtendimento, codigo, dataExpiracao) VALUES (${idUnidadeAtendimento},'${maquina_nova.codigo}',NOW() + INTERVAL 7 DAY)`
  var select = `SELECT idDac FROM Dac WHERE fkUnidadeDeAtendimento = ${idUnidadeAtendimento} AND codigoValidacao = '${maquina_nova.codigo}';`
  console.log("-------------------------------------------------------------------------------------------")
  console.log("Insert feito no banco:", insert)
  console.log("-------------------------------------------------------------------------------------------")
  await database.executar(insert);
  await database.executar(insert2)

  return database.executar(select)
}

function inserirmaquinaservicos(maquina_nova, idUnidadeAtendimento, idDac) {
  console.log(maquina_nova)
  var instrucaoSql = `INSERT INTO MedicoesSelecionadas (fkUnidadeDeAtendimento,fkDac,fkMedicoesDisponiveis) VALUES (${idUnidadeAtendimento},${idDac},13),`;
  if (maquina_nova.servicos[0] == true) {
    instrucaoSql += `(${idUnidadeAtendimento},${idDac},1),(${idUnidadeAtendimento},${idDac},2),(${idUnidadeAtendimento},${idDac},3),(${idUnidadeAtendimento},${idDac},4),(${idUnidadeAtendimento},${idDac},5),(${idUnidadeAtendimento},${idDac},12),`
  } if (maquina_nova.servicos[1] == true) {
    instrucaoSql += `(${idUnidadeAtendimento},${idDac},6),(${idUnidadeAtendimento},${idDac},7),(${idUnidadeAtendimento},${idDac},8),(${idUnidadeAtendimento},${idDac},9),(${idUnidadeAtendimento},${idDac},17),`
  } if (maquina_nova.servicos[2] == true) {
    instrucaoSql += `(${idUnidadeAtendimento},${idDac},10),`
  } if (maquina_nova.servicos[3] == true) {
    instrucaoSql += `(${idUnidadeAtendimento},${idDac},11),(${idUnidadeAtendimento},${idDac},14),(${idUnidadeAtendimento},${idDac},15),(${idUnidadeAtendimento},${idDac},16),`
  } 
  instrucaoSql = instrucaoSql.slice(0, -1) + ";";
  console.log(instrucaoSql[instrucaoSql.length - 1])
  console.log("Insert de máquina:", instrucaoSql)
  return database.executar(instrucaoSql);
}
function inserirmaquinametricaspersonalizadas(maquina_nova, idUnidadeAtendimento, idDac) {
  console.log(maquina_nova)
  var instrucaoSql = `INSERT INTO MetricaAlerta (fkMedicoesDisponiveis,fkUnidadeDeAtendimento,fkDac,fkUnidadeDeAtendimentoDac,nomeNivel,valorMinimo,valorMaximo) VALUES`;
  if (maquina_nova.servicos[0] == true) {
    instrucaoSql += `(1,${idUnidadeAtendimento},${idDac},${idUnidadeAtendimento},"Atenção",${maquina_nova.alertaAtencao[0][0]},${maquina_nova.alertaAtencao[0][1]}),(1,${idUnidadeAtendimento},${idDac},${idUnidadeAtendimento},"Alerta",${maquina_nova.alerta[0][0]},${maquina_nova.alerta[0][1]}),`
  } if (maquina_nova.servicos[1] == true) {
    instrucaoSql += `(6,${idUnidadeAtendimento},${idDac},${idUnidadeAtendimento},"Atenção",${maquina_nova.alertaAtencao[1][0]},${maquina_nova.alertaAtencao[1][1]}),(6,${idUnidadeAtendimento},${idDac},${idUnidadeAtendimento},"Alerta",${maquina_nova.alerta[1][0]},${maquina_nova.alerta[1][1]}),`
  } if (maquina_nova.servicos[2] == true) {
    instrucaoSql += `(10,${idUnidadeAtendimento},${idDac},${idUnidadeAtendimento},"Atenção",${maquina_nova.alertaAtencao[2][0]},${maquina_nova.alertaAtencao[2][1]}),(10,${idUnidadeAtendimento},${idDac},${idUnidadeAtendimento},"Alerta",${maquina_nova.alerta[2][0]},${maquina_nova.alerta[2][1]}),`
  } 
  instrucaoSql = instrucaoSql.slice(0, -1) + ";";
  console.log(instrucaoSql[instrucaoSql.length - 1])
  console.log("Insert de máquina:", instrucaoSql)
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarLogAcesso,
  buscarNomeDaUnidade,
  buscarMaquina,
  buscarKpisMonitoramento,
  buscarMetricasPadrao,
  inserirmaquina,
  inserirmaquinaservicos,
  inserirmaquinametricaspersonalizadas
};