var database = require("../database/config");

function buscarnomemaquina(idDac) {
    var instrucaoSql = `SELECT nomeIdentificacao FROM Dac WHERE idDac = ${idDac}`;

    return database.executar(instrucaoSql);
}

function buscarDadosDisco(idDac) {
    var instrucaoSql = `SELECT 
                            *
                        FROM
                            leitura
                        WHERE
                            fkDac = ${idDac}
                                AND (fkMedicoesDisponiveis = 10
                                OR fkMedicoesDisponiveis = 14
                                OR fkMedicoesDisponiveis = 15
                                OR fkMedicoesDisponiveis = 16)
                        ORDER BY idLeitura DESC
                        LIMIT 4;`;

    return database.executar(instrucaoSql);
}

function buscarUltimasVariacoesUsoDisco(idDac) {
    var instrucaoSql = `SELECT 
                            medidaCapturada, MAX(dataCaptura) AS ultimaDataCaptura
                        FROM
                            leitura
                        WHERE
                            fkDac = ${idDac} AND fkMedicoesDisponiveis = 10
                        GROUP BY medidaCapturada
                        ORDER BY ultimaDataCaptura ASC
                        LIMIT 10;`;

    return database.executar(instrucaoSql);
}

// function buscarmetricasrammaquina(idDac) {
//     var instrucaoSql = `SELECT valorMinimo,valorMaximo,nomeNivel FROM MetricaAlerta WHERE fkDac = ${idDac} AND fkMedicoesDisponiveis = 6;`;

//     return database.executar(instrucaoSql);
// }
// function buscarmetricasrammaquinaunidade(idUnidade) {
//     var instrucaoSql = `SELECT valorMinimo,valorMaximo,nomeNivel FROM MetricaAlerta WHERE fkUnidadeDeAtendimento = ${idUnidade} AND fkMedicoesDisponiveis = 6 AND fkDac IS NULL;`;

//     return database.executar(instrucaoSql);
// }
// function puxardadosgraficoRAM(idDac) {
//     var instrucaoSql = `SELECT fkMedicoesDisponiveis,medidaCapturada,dataCaptura FROM Leitura WHERE fkDac = ${idDac} AND (fkMedicoesDisponiveis = 6 OR fkMedicoesDisponiveis = 8) ORDER BY idLeitura DESC LIMIT 20`;

//     return database.executar(instrucaoSql);
// }
// function atualizardadosgraficoRAM(idDac) {
//     var instrucaoSql = `SELECT fkMedicoesDisponiveis,medidaCapturada,dataCaptura FROM Leitura WHERE fkDac = ${idDac} AND (fkMedicoesDisponiveis = 6 OR fkMedicoesDisponiveis = 8) ORDER BY idLeitura DESC LIMIT 2`;

//     return database.executar(instrucaoSql);
// }
// function buscarranking(idDac) {
//     var instrucaoSql = `SELECT medidaCapturada FROM Leitura WHERE fkDac = ${idDac} AND fkMedicoesDisponiveis = 17 ORDER BY idLeitura DESC LIMIT 1`;

//     return database.executar(instrucaoSql);
// }
// function buscarestresse(idDac) {
//     var instrucaoSql = `SELECT dataInicio,dataTermino FROM Alerta WHERE fkDac = ${idDac} AND fkMedicoesDisponiveis = 8 AND (dataTermino >= NOW() - INTERVAL 1 DAY OR dataTermino IS NULL);`;

//     return database.executar(instrucaoSql);
// }
// function atualizarRecomendacaoIA(idDac, texto) {
//     var instrucaoSql = `UPDATE Dac SET recomendacaoIA = '${texto}' WHERE idDac = ${idDac}`;

//     return database.executar(instrucaoSql);
// }
// function buscartextoIA(idDac) {
//     var instrucaoSql = `SELECT recomendacaoIA FROM Dac WHERE idDac = ${idDac}`;

//     return database.executar(instrucaoSql);
// }




module.exports = {
    buscarnomemaquina,
    buscarDadosDisco,
    buscarUltimasVariacoesUsoDisco,
    // buscarmetricasrammaquina,
    // buscarmetricasrammaquinaunidade,
    // puxardadosgraficoRAM,
    // atualizardadosgraficoRAM,
    // buscarranking,
    // buscarestresse,
    // atualizarRecomendacaoIA,
    // buscartextoIA
};