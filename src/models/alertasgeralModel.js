var database = require("../database/config");

function puxarAlertasGeral(fkUnidade){
     var instrucaoSql = `SELECT 
                            idAlerta,
                            nomeAlerta,
                            medD.nomeDaMedicao AS monitoramento,
                            Dac.nomeIdentificacao AS nomeMaquina,
                            dataInicio,
                            dataTermino,
                            statusAlerta,
                            dataVisualizacao,
                            nomeVisualizador AS verificador
                        FROM
                            Alerta
                                JOIN
                            MedicoesSelecionadas AS medS ON medS.idMedicoesSelecionadas = Alerta.fkMedicoesSelecionadas
                                JOIN
                            Dac ON medS.fkDac = Dac.idDac
                                JOIN
                            MedicoesDisponiveis AS medD ON medD.idMedicoesDisponiveis = medS.fkMedicoesDisponiveis
                        WHERE
                            Alerta.fkUnidadeDeAtendimento = ${fkUnidade}
                        ORDER BY idAlerta DESC;`;
    
    return database.executar(instrucaoSql);
}

function marcarAlertaComoVerificado(idAlerta, dataVisualizacao, nomeVisualizador) {
  var instrucaoSql = `UPDATE Alerta
                        SET
                            statusAlerta = 'Verificado',
                            dataVisualizacao = NOW(),
                            nomeVisualizador = '${nomeVisualizador}'
                        WHERE idAlerta = ${idAlerta};`;

  return database.executar(instrucaoSql);
} 

module.exports={
    puxarAlertasGeral,
    marcarAlertaComoVerificado
};