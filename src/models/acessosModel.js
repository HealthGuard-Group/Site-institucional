var database = require("../database/config");

function buscarDadosLogs(idUnidadeAtendimento){
     var instrucaoSql = `SELECT 
    u.nome,
    u.email,
    la.acao,
    la.horarioDaAcao,
    la.statusAcao
    FROM LogAcoes AS la
    JOIN Usuario AS u
    ON la.fkUsuario = u.idUsuario
    WHERE la.fkUnidadeAtendimento = ${idUnidadeAtendimento};`;
    
    return database.executar(instrucaoSql);
 }

  module.exports={
    buscarDadosLogs
  };