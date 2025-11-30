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

function alertasCpu(idDac) {
    var instrucaoSql = `
    select count(idAlerta) as total from Alerta
    where fkMedicoesSelecionadas = 1 and fkDac = ${idDac} - interval 24 hour ;
    `
   return database.executar(instrucaoSql);
}

function alertasRam(idDac) {
    var instrucaoSql = `
    select count(idAlerta)as total from Alerta
    where fkMedicoesSelecionadas = 6 and 8 and fkDac = ${idDac} - interval 24 hour;
    `
   return database.executar(instrucaoSql);
}

function alertasDisco(idDac) {
    var instrucaoSql = `
    select count(idAlerta) as total from Alerta
    where fkMedicoesSelecionadas = 10 and fkDac = ${idDac} - interval 24 hour;
    `
   return database.executar(instrucaoSql);
}

function duracaoAlertaCpu(idDac) {
    var instrucaoSql = `
    select 
    ifnull(
        concat(
            floor(avg(timestampdiff(minute, a.dataInicio, a.dataTermino)) / 60),
            'h ',
            lpad(avg(timestampdiff(minute, a.dataInicio, a.dataTermino)) % 60, 2, '0'),
            'min'
        ),
        'Dados insuficientes'
    ) as duracao
    from alerta a
    where a.fkMedicoesDisponiveis = 1 and a.fkDac = ${idDac}
    and a.dataInicio >= now() - interval 24 hour
    and a.dataTermino is not null;
    `
   return database.executar(instrucaoSql);
}

function duracaoAlertaRam(idDac) {
    var instrucaoSql = `
    select 
    ifnull(
        concat(
            floor(avg(timestampdiff(minute, a.dataInicio, a.dataTermino)) / 60),
            'h ',
            lpad(avg(timestampdiff(minute, a.dataInicio, a.dataTermino)) % 60, 2, '0'),
            'min'
        ),
        'Dados insuficientes'
    ) as duracao
    from alerta a
    where a.fkMedicoesDisponiveis in (6, 8) and a.fkDac = ${idDac}
    and a.dataInicio >= now() - interval 24 hour
    and a.dataTermino is not null;
    `
   return database.executar(instrucaoSql);
}

function duracaoAlertaDisco(idDac) {
    var instrucaoSql = `
    select 
    ifnull(
        concat(
            floor(avg(timestampdiff(minute, a.dataInicio, a.dataTermino)) / 60),
            'h ',
            lpad(avg(timestampdiff(minute, a.dataInicio, a.dataTermino)) % 60, 2, '0'),
            'min'
        ),
        'Dados insuficientes'
    ) as duracao
    from alerta a
    where a.fkMedicoesDisponiveis = 10 and a.fkDac = ${idDac}
    and a.dataInicio >= now() - interval 24 hour
    and a.dataTermino is not null;
    `
   return database.executar(instrucaoSql);
}

function cpu24h(idDac) {
    var instrucaoSql = `
    select 
    ifnull(
        concat(
            round(avg(a.medidaCapturada), 2),
            '%'
        ),
        'Dados insuficientes'
    ) as mediauso
    from leitura a
    where a.dataCaptura >= now() - interval 24 hour
    and a.fkMedicoesDisponiveis = 1
    and a.fkDac = ${idDac};
    `
   return database.executar(instrucaoSql);
}

function ram24h(idDac) {
    var instrucaoSql = `
    select 
    ifnull(
        concat(
            round(avg(a.medidaCapturada), 2),
            '%'
        ),
        'Dados insuficientes'
    ) as mediauso
    from leitura a
    where a.dataCaptura >= now() - interval 24 hour
    and a.fkMedicoesDisponiveis = 6
    and a.fkDac = ${idDac};
    `
   return database.executar(instrucaoSql);
}

function disco24h(idDac) {
    var instrucaoSql = `
    select 
    ifnull(
        concat(
            round(avg(a.medidaCapturada), 2),
            '%'
        ),
        'Dados insuficientes'
    ) as mediauso
    from leitura a
    where a.dataCaptura >= now() - interval 24 hour
    and a.fkMedicoesDisponiveis = 10
    and a.fkDac = ${idDac};
    `
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
    inativarMaquina,
    alertasCpu,
    alertasRam,
    alertasDisco,
    duracaoAlertaCpu,
    duracaoAlertaRam,
    duracaoAlertaDisco,
    cpu24h,
    ram24h,
    disco24h
};