var database = require("../database/config");

function buscarKpisSemana(idUnidadeAtendimento) {
    var instrucao = `
        SELECT
        (SELECT COUNT(*) FROM Alerta a JOIN Dac d ON a.fkDac=d.idDac AND a.fkUnidadeDeAtendimento=d.fkUnidadeDeAtendimento
        WHERE d.fkUnidadeDeAtendimento=${idUnidadeAtendimento} AND a.dataInicio>=DATE_SUB(CURDATE(),INTERVAL 7 DAY)) AS totalSemana,
        (SELECT TIMESTAMPDIFF(MINUTE,(SELECT MAX(a2.dataInicio) FROM Alerta a2 JOIN Dac d2 ON a2.fkDac=d2.idDac AND a2.fkUnidadeDeAtendimento=d2.fkUnidadeDeAtendimento
        WHERE d2.fkUnidadeDeAtendimento=${idUnidadeAtendimento}),NOW())) AS desdeUltimoAlerta,
        (SELECT COUNT(*) FROM Alerta a JOIN Dac d ON a.fkDac=d.idDac AND a.fkUnidadeDeAtendimento=d.fkUnidadeDeAtendimento
        WHERE d.fkUnidadeDeAtendimento=${idUnidadeAtendimento} AND a.statusAlerta="Não verificado") AS naoVerificados,
        (SELECT d.nomeIdentificacao FROM Alerta a JOIN Dac d ON a.fkDac=d.idDac AND a.fkUnidadeDeAtendimento=d.fkUnidadeDeAtendimento
        WHERE d.fkUnidadeDeAtendimento=${idUnidadeAtendimento} ORDER BY a.dataInicio DESC LIMIT 1) AS ultimaMaquina;
    `;
    return database.executar(instrucao);
}

function buscarAlertasPorSeveridade(idUnidadeAtendimento) {
    var instrucao = `
  SELECT nomeAlerta AS nivel, COUNT(*) AS total
  FROM Alerta WHERE fkUnidadeDeAtendimento = ${idUnidadeAtendimento}
  AND dataInicio >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
  AND nomeAlerta IN ('Atenção', 'Alerta') GROUP BY nomeAlerta;
    `;
    return database.executar(instrucao);
}

function buscarRankingMaquinas(idUnidadeAtendimento) {
    var instrucao = `
        SELECT d.idDac,d.nomeIdentificacao,COUNT(a.idAlerta) AS totalAlertas
        FROM Dac d LEFT JOIN Alerta a ON a.fkDac=d.idDac AND a.fkUnidadeDeAtendimento=d.fkUnidadeDeAtendimento AND a.dataInicio>=DATE_SUB(CURDATE(),INTERVAL 7 DAY)
        WHERE d.fkUnidadeDeAtendimento=${idUnidadeAtendimento}
        GROUP BY d.idDac,d.nomeIdentificacao ORDER BY totalAlertas DESC LIMIT 5;
    `;
    return database.executar(instrucao);
}

function buscarAlertaSemana(idUnidadeAtendimento) {
    var instrucao = `
        SELECT 
            COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 0 THEN 1 END) as dia_1,
            COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 1 THEN 1 END) as dia_2,
            COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 2 THEN 1 END) as dia_3,
            COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 3 THEN 1 END) as dia_4,
            COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 4 THEN 1 END) as dia_5,
            COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 5 THEN 1 END) as dia_6,
            COUNT(CASE WHEN DATEDIFF(NOW(), dataInicio) = 6 THEN 1 END) as dia_7
        FROM Alerta 
        WHERE fkUnidadeDeAtendimento = ${idUnidadeAtendimento}
        AND dataInicio >= NOW() - INTERVAL 7 DAY;
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarKpisSemana,
    buscarAlertasPorSeveridade,
    buscarRankingMaquinas,
    buscarAlertaSemana
};
