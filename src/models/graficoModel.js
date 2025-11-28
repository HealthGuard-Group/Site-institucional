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

function buscarMedicoesSelecionadas(idDac) {
    const instrucaoSql = `
        select * from medicoesSelecionadas where fkDac = ${idDac};
    `;
    return database.executar(instrucaoSql);
}

function totalAlerta(idDac){
  var instrucaoSql = `
      select count(idAlerta) as totalAlertas
      from alerta
      where fkDac = ${idDac}
      and dataInicio >= now() - interval 24 hour;
  `
  return database.executar(instrucaoSql);
}

function buscarCpu(idDac){
  var instrucaoSql = `
      select medidaCapturada from  Leitura where fkDac = ${idDac} and fkMedicoesSelecionadas = 1
      order by dataCaptura desc
      limit 1;
  `
   return database.executar(instrucaoSql);
}

function buscarRam(idDac){
  var instrucaoSql = `
      select medidaCapturada from  Leitura where fkDac = ${idDac} and fkMedicoesSelecionadas = 6
      order by dataCaptura desc
      limit 1;
  ` 
   return database.executar(instrucaoSql);
}

function buscarDisco(idDac){
  var instrucaoSql = `
      select medidaCapturada from  Leitura where fkDac = ${idDac} and fkMedicoesSelecionadas = 10
      order by dataCaptura desc
      limit 1;
  ` 
   return database.executar(instrucaoSql);
}

function buscarRede(idDac){
  var instrucaoSql = `
      select dataCaptura from  Leitura where fkDac = ${idDac}
      order by dataCaptura desc
      limit 1;
  `
   return database.executar(instrucaoSql);
}

function excluirMaquina(idDac) {
    var instrucaoSql = `
      update Dac set statusDac = 'Excluido' where idDac = ${idDac};
  `
   return database.executar(instrucaoSql);
}

function puxarDadosGraficoDash(idDac, idMonitoramento) {
    var instrucaoSql = `SELECT medidaCapturada,dataCaptura FROM Leitura WHERE fkDac = ${idDac} AND fkMedicoesDisponiveis = ${idMonitoramento} ORDER BY idLeitura DESC LIMIT 7;`
   return database.executar(instrucaoSql);
}

function puxarDadosGraficoDash(idDac, idMonitoramento) {
    var instrucaoSql = `SELECT medidaCapturada,dataCaptura FROM Leitura WHERE fkDac = ${idDac} AND fkMedicoesDisponiveis = ${idMonitoramento} ORDER BY idLeitura DESC LIMIT 7;`
   return database.executar(instrucaoSql);
}

function atualizarDadosGraficoDashMonitoramento(idDac, idMonitoramento) {
    var instrucaoSql = `SELECT medidaCapturada,dataCaptura FROM Leitura WHERE fkDac = ${idDac} AND fkMedicoesDisponiveis = ${idMonitoramento} ORDER BY idLeitura DESC LIMIT 1;`
   return database.executar(instrucaoSql);
}

function tempoAtividade(idDac) {
    var instrucaoSql = `
    select medidaCapturada from Leitura  where fkDac = ${idDac} and fkMedicoesDisponiveis = 13
    order by idLeitura desc
    limit 1;
    `
   return database.executar(instrucaoSql);
}

function mediaAlertas(idDac) {
    var instrucaoSql = `
    select round(avg(qtdalertas), 0) as mediaalertasdiarios
    from (
    select date(dataInicio) as dia, count(*) as qtdalertas
    from Alerta
    where fkDac = ${idDac}
    group by date(dataInicio)
    ) as alertasdia;
    `
   return database.executar(instrucaoSql);
}

function ativarMaquina(idDac) {
  var instrucaoSql = `
      update Dac 
      set statusDac = 'Ativo'
      where idDac = ${idDac};
  `;
  return database.executar(instrucaoSql);
}

function inativarMaquina(idDac) {
  var instrucaoSql = `
      update Dac 
      set statusDac = 'Inativo'
      where idDac = ${idDac};
  `;
  return database.executar(instrucaoSql);
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
};