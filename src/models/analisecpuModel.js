const { puxarprocessos } = require("../controllers/analisecpuController");
var database = require("../database/config");

function puxarProcessos(fkunidade, fkDAC) {
    var instrucaoSql = ` SELECT 
    a.nomeFantasia, 
    c.nomeIdentificacao, 
    b.nomeDaMedicao, 
    d.medidaCapturada, 
    b.unidadeDeMedida, 
    d.dataCaptura  
FROM 
    UnidadeDeAtendimento AS a
JOIN 
    Dac AS c ON a.idUnidadeDeAtendimento = c.fkUnidadeDeAtendimento
JOIN 
    Leitura AS d ON c.idDac = d.fkDac
JOIN 
    MedicoesDisponiveis AS b ON d.fkMedicoesDisponiveis = b.idMedicoesDisponiveis where d.fkDac = ${fkDAC} and d.fkUnidadeDeAtendimento = ${fkunidade}  and b.nomeDaMedicao = 'Processos ativos' order by dataCaptura desc limit 1;`;
    return database.executar(instrucaoSql);
}

function puxarThreads(fkunidade, fkDAC) {
    var instrucaoSql = ` SELECT 
    a.nomeFantasia, 
    c.nomeIdentificacao, 
    b.nomeDaMedicao, 
   d.medidaCapturada,
    d.dataCaptura  
FROM 
    UnidadeDeAtendimento AS a
JOIN 
    Dac AS c ON a.idUnidadeDeAtendimento = c.fkUnidadeDeAtendimento
JOIN 
    Leitura AS d ON c.idDac = d.fkDac
JOIN 
    MedicoesDisponiveis AS b ON d.fkMedicoesDisponiveis = b.idMedicoesDisponiveis where d.fkUnidadeDeAtendimento = '${fkunidade}' and d.fkDac = ${fkDAC} and b.nomeDaMedicao = 'Threads' order by d.dataCaptura desc limit 1;`;
    return database.executar(instrucaoSql);
}

function puxarCPU(fkunidade, fkDAC) {
    var instrucaoSql = `SELECT 
    a.nomeFantasia, 
    c.nomeIdentificacao, 
    b.nomeDaMedicao, 
    d.medidaCapturada,
    d.dataCaptura  
FROM 
    UnidadeDeAtendimento AS a
JOIN 
    Dac AS c ON a.idUnidadeDeAtendimento = c.fkUnidadeDeAtendimento
JOIN 
    Leitura AS d ON c.idDac = d.fkDac
JOIN 
    MedicoesDisponiveis AS b ON d.fkMedicoesDisponiveis = b.idMedicoesDisponiveis where d.fkUnidadeDeAtendimento = '${fkunidade}' and d.fkDac = ${fkDAC} and b.nomeDaMedicao = 'Porcentagem de uso da CPU' order by d.dataCaptura desc limit 1`;
    return database.executar(instrucaoSql);
}

function puxarQtdAlertas(fkunidade, fkDAC) {
    var instrucaoSql = `select count(idAlerta) as qtdalertas from Alerta where fkMedicoesDisponiveis = 1 and fkDac = ${fkDAC}  and dataInicio > now() - interval 7 day;`;
    return database.executar(instrucaoSql);
}

function puxarPorNucleo(fkUNIDADE, fkDAC) {
    var instrucaoSql = ` 
     SELECT 
    a.nomeFantasia, 
    c.nomeIdentificacao, 
    b.nomeDaMedicao, 
   d.medidaCapturada,
    d.dataCaptura  
FROM 
    UnidadeDeAtendimento AS a
JOIN 
    Dac AS c ON a.idUnidadeDeAtendimento = c.fkUnidadeDeAtendimento
JOIN 
    Leitura AS d ON c.idDac = d.fkDac
JOIN 
    MedicoesDisponiveis AS b ON d.fkMedicoesDisponiveis = b.idMedicoesDisponiveis where  d.fkUnidadeDeAtendimento = ${fkUNIDADE} and d.fkDac = ${fkDAC} and  b.nomeDaMedicao = 'Porcentagem CPU - nucleo' order by d.dataCaptura desc limit 1;`
    return database.executar(instrucaoSql)
}

function puxarMetricas(fkDAC) {
    var instrucaoSql = ` SELECT nomeNivel, valorMinimo, valorMaximo 
FROM MetricaAlerta 
WHERE fkMedicoesDisponiveis = 1 and fkDac = ${fkDAC}
AND nomeNivel IN ('Atenção', 'Alerta');`
    return database.executar(instrucaoSql)
}

function puxarDadosAlertas(fkDAC) {
    var instrucaoSql = `select nomeAlerta, dataInicio, pico from Alerta where fkMedicoesDisponiveis = 1 and fkDac = ${fkDAC} order by dataInicio desc limit 10;
`
    return database.executar(instrucaoSql)
}

function iniciarpuxarporNucleo(fkDAC) {
    var instrucaoSql = ` 
     SELECT 
    a.nomeFantasia, 
    c.nomeIdentificacao, 
    b.nomeDaMedicao, 
   d.medidaCapturada,
    d.dataCaptura  
FROM 
    UnidadeDeAtendimento AS a
JOIN 
    Dac AS c ON a.idUnidadeDeAtendimento = c.fkUnidadeDeAtendimento
JOIN 
    Leitura AS d ON c.idDac = d.fkDac
JOIN 
    MedicoesDisponiveis AS b ON d.fkMedicoesDisponiveis = b.idMedicoesDisponiveis where d.fkDac = ${fkDAC} and  b.nomeDaMedicao = 'Porcentagem CPU - nucleo' order by d.dataCaptura asc limit 30;`
    return database.executar(instrucaoSql)
}

module.exports = {
    puxarProcessos,
    puxarThreads,
    puxarCPU,
    puxarQtdAlertas,
    puxarPorNucleo,
    puxarMetricas,
    puxarDadosAlertas,
    iniciarpuxarporNucleo
};