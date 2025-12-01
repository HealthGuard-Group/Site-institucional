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
        select * from MedicoesSelecionadas where fkDac = ${idDac};
    `;
    return database.executar(instrucaoSql);
}

function totalAlerta(idDac) {
    var instrucaoSql = `
      select count(idAlerta) as totalAlertas
      from Alerta
      where fkDac = ${idDac}
      and dataInicio >= now() - interval 24 hour;
  `
    return database.executar(instrucaoSql);
}

function buscarCpu(idDac) {
    var instrucaoSql = `
      SELECT medidaCapturada FROM Leitura WHERE fkDac = ${idDac} AND fkMedicoesDisponiveis = 1
      ORDER BY dataCaptura DESC
      LIMIT 1;
  `
    return database.executar(instrucaoSql);
}

function buscarRam(idDac) {
    var instrucaoSql = `
      select medidaCapturada from Leitura where fkDac = ${idDac} and fkMedicoesDisponiveis = 6
      order by dataCaptura desc
      limit 1;
  `
    return database.executar(instrucaoSql);
}

function buscarDisco(idDac) {
    var instrucaoSql = `
      select medidaCapturada from Leitura where fkDac = ${idDac} and fkMedicoesDisponiveis = 10
      order by dataCaptura desc
      limit 1;
  `
    return database.executar(instrucaoSql);
}

function buscarRede(idDac) {
    var instrucaoSql = `
      select dataCaptura from Leitura where fkDac = ${idDac}
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
    where fkMedicoesDisponiveis = 1
    and fkDac = ${idDac}
    and dataInicio >= now() - interval 24 hour;
    `
    return database.executar(instrucaoSql);
}

function alertasRam(idDac) {
    var instrucaoSql = `
    select count(idAlerta) as total from Alerta
    where fkMedicoesDisponiveis in (6,8)
    and fkDac = ${idDac}
    and dataInicio >= now() - interval 24 hour;
    `
    return database.executar(instrucaoSql);
}

function alertasDisco(idDac) {
    var instrucaoSql = `
    select count(idAlerta) as total from Alerta
where fkMedicoesDisponiveis = 10
and fkDac = ${idDac}
and dataInicio >= now() - interval 24 hour;
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
    from Alerta a
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
    from Alerta a
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
    from Alerta a
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
    from Leitura a
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
    from Leitura a
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
    from Leitura a
    where a.dataCaptura >= now() - interval 24 hour
    and a.fkMedicoesDisponiveis = 10
    and a.fkDac = ${idDac};
    `
    return database.executar(instrucaoSql);
}

function puxarDadosGraficoAlerta(idDac,idMonitoramento) {
    var instrucaoSql = `
    SELECT 
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 0 AND nomeAlerta = 'Atenção' THEN 1 END) as dia_1_atencao,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 0 AND nomeAlerta = 'Alerta'  THEN 1 END) as dia_1_alerta,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 1 AND nomeAlerta = 'Atenção' THEN 1 END) as dia_2_atencao,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 1 AND nomeAlerta = 'Alerta'  THEN 1 END) as dia_2_alerta,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 2 AND nomeAlerta = 'Atenção' THEN 1 END) as dia_3_atencao,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 2 AND nomeAlerta = 'Alerta'  THEN 1 END) as dia_3_alerta,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 3 AND nomeAlerta = 'Atenção' THEN 1 END) as dia_4_atencao,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 3 AND nomeAlerta = 'Alerta'  THEN 1 END) as dia_4_alerta,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 4 AND nomeAlerta = 'Atenção' THEN 1 END) as dia_5_atencao,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 4 AND nomeAlerta = 'Alerta'  THEN 1 END) as dia_5_alerta,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 5 AND nomeAlerta = 'Atenção' THEN 1 END) as dia_6_atencao,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 5 AND nomeAlerta = 'Alerta'  THEN 1 END) as dia_6_alerta,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 6 AND nomeAlerta = 'Atenção' THEN 1 END) as dia_7_atencao,
    COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 6 AND nomeAlerta = 'Alerta'  THEN 1 END) as dia_7_alerta
FROM Alerta 
WHERE fkDac = ${idDac}
AND dataInicio >= NOW() - INTERVAL 7 DAY AND fkMedicoesDisponiveis = ${idMonitoramento};
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
    disco24h,
    puxarDadosGraficoAlerta
};