var database = require("../database/config");

function puxarAlertasGeral(idUnidadeAtendimento){
     var instrucaoSql = `SELECT
                            alerta.fkUnidadeDeAtendimento, 
                            metriA.nomeNivel AS tipoAlerta,
                            dac.nomeIdentificacao AS nomeMaquina,
                            dataInicio,
                            dataTermino,
                            statusAlerta    
                        FROM
                            alerta
                            JOIN medicoesSelecionadas AS medS 
                              ON medS.idMedicoesSelecionadas = alerta.fkMedicoesSelecionadas
                            JOIN MedicoesDisponiveis AS medD 
                              ON medD.idMedicoesDisponiveis = medS.fkMedicoesDisponiveis
                            JOIN MetricaAlerta AS metriA 
                              ON metriA.fkMedicoesDisponiveis = medD.idMedicoesDisponiveis
                            JOIN Dac 
                              ON metriA.fkDac = dac.idDac
                            WHERE alerta.fkUnidadeDeAtendimento = 1`;
    
    return database.executar(instrucaoSql);
 }

  module.exports={
    puxarAlertasGeral
  };