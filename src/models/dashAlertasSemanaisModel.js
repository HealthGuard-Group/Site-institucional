var database = require("../database/config");

function buscarKpisSemana(idUnidadeAtendimento) {
    const instrucao = `
        SELECT
        (SELECT COUNT(*) FROM Alerta a JOIN Dac d ON a.fkDac = d.idDac AND a.fkUnidadeDeAtendimento = d.fkUnidadeDeAtendimento WHERE d.fkUnidadeDeAtendimento = ${idUnidadeAtendimento} AND a.dataInicio >= DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)) AS totalSemana,
        (SELECT TIMESTAMPDIFF(MINUTE,(SELECT MAX(a2.dataInicio) FROM Alerta a2 JOIN Dac d2 ON a2.fkDac = d2.idDac AND a2.fkUnidadeDeAtendimento = d2.fkUnidadeDeAtendimento WHERE d2.fkUnidadeDeAtendimento = ${idUnidadeAtendimento}), NOW())) AS desdeUltimoAlerta,
        (SELECT COUNT(*) FROM Alerta a JOIN Dac d ON a.fkDac = d.idDac AND a.fkUnidadeDeAtendimento = d.fkUnidadeDeAtendimento WHERE d.fkUnidadeDeAtendimento = ${idUnidadeAtendimento} AND a.statusAlerta = "Não verificado") AS naoVerificados,
        (SELECT d.nomeIdentificacao FROM Alerta a JOIN Dac d ON a.fkDac = d.idDac AND a.fkUnidadeDeAtendimento = d.fkUnidadeDeAtendimento WHERE d.fkUnidadeDeAtendimento = ${idUnidadeAtendimento} ORDER BY a.dataInicio DESC LIMIT 1) AS ultimaMaquina;
    `;
    return database.executar(instrucao);
}

function buscarAlertasPorSeveridade(idUnidadeAtendimento) {
    const instrucao = `
        SELECT ma.nomeNivel AS nivel, COUNT(*) AS total
        FROM Alerta a
        JOIN MedicoesSelecionadas ms ON a.fkMedicoesSelecionadas = ms.idMedicoesSelecionadas AND a.fkDac = ms.fkDac AND a.fkUnidadeDeAtendimento = ms.fkUnidadeDeAtendimento
        JOIN MetricaAlerta ma ON ms.fkMedicoesDisponiveis = ma.fkMedicoesDisponiveis AND ms.fkUnidadeDeAtendimento = ma.fkUnidadeDeAtendimento
        WHERE a.fkUnidadeDeAtendimento = ${idUnidadeAtendimento}
        GROUP BY ma.nomeNivel;
    `;
    return database.executar(instrucao);
}

module.exports = { 
    buscarKpisSemana,
    buscarAlertasPorSeveridade
 };
