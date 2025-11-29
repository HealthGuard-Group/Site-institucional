var database = require("../database/config");

function puxarAlertasGeral(idUnidadeAtendimento){
     var instrucaoSql = `SELECT 
                              idAlerta,
                              nomeAlerta,
                              medD.nomeDaMedicao AS monitoramento,
                              dac.nomeIdentificacao AS nomeMaquina,
                              dataInicio,
                              dataTermino,
                              statusAlerta,
                              dataVisualizacao,
                              nomeVisualizador AS verificador
                          FROM
                              alerta
                                  JOIN
                              medicoesSelecionadas AS medS ON medS.idMedicoesSelecionadas = alerta.fkMedicoesSelecionadas
                                  JOIN
                              Dac ON medS.fkDac = dac.idDac
                                  JOIN
                              MedicoesDisponiveis AS medD ON medD.idMedicoesDisponiveis = medS.fkMedicoesDisponiveis
                          WHERE
                              alerta.fkUnidadeDeAtendimento = 1;`;
    
    return database.executar(instrucaoSql);
 }

  module.exports={
    puxarAlertasGeral
  };