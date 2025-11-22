var database = require("../database/config");

function puxardados(fkunidade, fkDAC) {
    var instrucaoSql = `select * from Leitura;`;
    return database.executar(instrucaoSql);
    
    
}

module.exports = {
    puxardados
};