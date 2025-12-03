var database = require("../database/config");

function registrar(fkUnidade, fkLogAcesso, fkUsuario, acao, statusAcao) {
    var instrucao = `
        INSERT INTO LogAcoes (fkUnidadeAtendimento, fkLogAcesso, fkUsuario, acao, statusAcao)
        VALUES (${fkUnidade}, ${fkLogAcesso}, ${fkUsuario}, '${acao}', '${statusAcao}');
    `;
    console.log("Executando SQL:\n", instrucao);
    return database.executar(instrucao);
}

function listar() {
    var instrucao = `
        SELECT 
            la.idLogAcoes,
            la.acao,
            la.statusAcao,
            la.horarioDaAcao,
            u.nome AS usuario,
            ua.nomeFantasia AS unidade
        FROM LogAcoes la
        JOIN Usuario u ON u.idUsuario = la.fkUsuario
        JOIN UnidadeDeAtendimento ua ON ua.idUnidadeDeAtendimento = la.fkUnidadeAtendimento
        ORDER BY la.horarioDaAcao DESC;
    `;
    console.log("Executando SQL:\n", instrucao);
    return database.executar(instrucao);
}

module.exports = {
    registrar,
    listar
};
