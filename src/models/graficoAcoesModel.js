const db = require("../database/config");

module.exports = {

    listarKpis(idUnidade) {
        const sql = `
            SELECT
                (SELECT COUNT(*) 
                    FROM LogAcoes 
                    WHERE fkUnidadeAtendimento = ${idUnidade}
                    AND horarioDaAcao >= NOW() - INTERVAL 24 HOUR) AS totalEventos,

                (SELECT COUNT(DISTINCT fkUsuario)
                    FROM LogAcesso
                    WHERE fkUnidadeDeAtendimento = ${idUnidade}
                    AND dataAcesso >= NOW() - INTERVAL 24 HOUR) AS usuariosAtivos,

                (SELECT COUNT(DISTINCT fkDac)
                    FROM Dac
                    WHERE fkUnidadeDeAtendimento = ${idUnidade}
                    AND statusDac IN ('Alerta','Inativo','Excluido')) AS maquinasAlteradas,

                (SELECT COUNT(*)
                    FROM LogAcoes
                    WHERE fkUnidadeAtendimento = ${idUnidade}
                    AND statusAcao = 'Falha'
                    AND horarioDaAcao >= NOW() - INTERVAL 24 HOUR) AS falhas
            ;
        `;
        return db.executar(sql);
    },

    cargaTrabalho(idUnidade) {
        const sql = `
            SELECT 
                DATE_FORMAT(horarioDaAcao, '%H:00') AS hora,
                COUNT(*) AS qtd
            FROM LogAcoes
            WHERE fkUnidadeAtendimento = ${idUnidade}
              AND horarioDaAcao >= NOW() - INTERVAL 6 HOUR
            GROUP BY HOUR(horarioDaAcao)
            ORDER BY HOUR(horarioDaAcao);
        `;
        return db.executar(sql);
    },

    tiposAcao(idUnidade) {
        const sql = `
            SELECT
                SUM(CASE WHEN acao LIKE '%leitura%' THEN 1 ELSE 0 END) AS leitura,
                SUM(CASE WHEN acao LIKE '%alter%' OR acao LIKE '%escrita%' THEN 1 ELSE 0 END) AS alteracao,
                SUM(CASE WHEN acao LIKE '%segurança%' OR acao LIKE '%login%' THEN 1 ELSE 0 END) AS seguranca
            FROM LogAcoes
            WHERE fkUnidadeAtendimento = ${idUnidade}
              AND horarioDaAcao >= NOW() - INTERVAL 24 HOUR;
        `;
        return db.executar(sql);
    },

    usuariosAtivos(idUnidade) {
        const sql = `
            SELECT 
                U.nome,
                COUNT(*) AS qtd
            FROM LogAcoes L
            JOIN Usuario U ON L.fkUsuario = U.idUsuario
            WHERE L.fkUnidadeAtendimento = ${idUnidade}
              AND L.horarioDaAcao >= NOW() - INTERVAL 24 HOUR
            GROUP BY U.idUsuario
            ORDER BY qtd DESC
            LIMIT 6;
        `;
        return db.executar(sql);
    }

};
