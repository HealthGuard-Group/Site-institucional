var database = require("../database/config");

function listar() {
    var instrucao = `
        SELECT 
            (SELECT COUNT(*) FROM LogAcesso) AS totalEventos,
            (SELECT COUNT(*) FROM Usuario WHERE statusUsuario = 'Ativo') AS usuariosAtivos,
            (SELECT COUNT(*) FROM CodigoConfiguracaoMaquina WHERE statusCodigoConfiguracaoMaquina = 'Aceito') AS maquinasAlteradas,
            (SELECT COUNT(*) FROM LogAcoes WHERE statusAcao = 'Falha') AS falhas;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar
};
