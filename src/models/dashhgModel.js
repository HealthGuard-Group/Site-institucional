var database = require("../database/config");

function empresasCadastradas(){

    var pegarEmpresasSql = 
        `select count(idUnidadeDeAtendimento) from UnidadeDeAtendimento;`;
        return database.executar(pegarEmpresasSql)
}

function quantidadeUsuarios(){
    var qtdUsuariosSql = 
    `select count(idUsuario) from Usuario;
    `;
    return database.executar(qtdUsuariosSql)
}

function percentual(){
    var totalMaquinasSql = 
    ` select 
    date(horarioDaAcao) as dia,
    count(distinct case 
        when acao = 'Realizando Login' then fkUsuario end) as quantidade_acessos
    from LogAcoes
    where horarioDaAcao >= CURDATE()
    group by date(horarioDaAcao)
    order by dia desc;`;
    return database.executar(totalMaquinasSql)
}

function usuariosDia(){
    var usuariosDiasSql = 
    ` select 
    date(horarioDaAcao) as dia,
    count(case when acao = 'Realizando Login' then 1 end) as quantidade_acessos
    from LogAcoes
    where horarioDaAcao >= now() - interval 7 day
    group by date(horarioDaAcao)
    order by dia;`;
    return database.executar(usuariosDiasSql)
}



function chamados(){
    var instrucaoSql = `
    
    SELECT COUNT(CASE WHEN acao = 'Abrindo chamado' THEN 1 END) AS chamados
    FROM LogAcoes
    WHERE horarioDaAcao >= now() - interval 7 day;
    
    `
    return database.executar(instrucaoSql)

}


function rankingAlertas(){
    var instrucaoSql = `
    
    SELECT 
    ROW_NUMBER() OVER (ORDER BY COUNT(a.idAlerta) DESC) AS posicao,
    ua.nomeFantasia AS nome,
    COUNT(a.idAlerta) AS alertas,
    COUNT(DISTINCT d.idDac) AS maquinas
	FROM UnidadeDeAtendimento ua
	JOIN Dac d 
    ON d.fkUnidadeDeAtendimento = ua.idUnidadeDeAtendimento
	LEFT JOIN Alerta a 
    ON a.fkDac = d.idDac
    AND DATE(a.dataInicio) = CURDATE()  
	GROUP BY ua.idUnidadeDeAtendimento, ua.nomeFantasia
	ORDER BY alertas DESC
	LIMIT 3;
    `

    return database.executar(instrucaoSql)

}



function rankingChamados(){
    var instrucaoSql = `
    
    SELECT 
    ua.nomeFantasia AS Nome,
    COUNT(DISTINCT CASE 
        WHEN la.acao LIKE '%chamado%' OR la.acao LIKE '%Chamado%' 
        THEN la.idLogAcoes 
    END) AS Chamados,
    COUNT(DISTINCT lu.fkUsuario) AS Usuarios
FROM UnidadeDeAtendimento ua
LEFT JOIN Dac d 
    ON ua.idUnidadeDeAtendimento = d.fkUnidadeDeAtendimento
LEFT JOIN LogAcoes la 
    ON la.fkUnidadeAtendimento = ua.idUnidadeDeAtendimento
LEFT JOIN LogAcesso lu
    ON lu.fkUnidadeDeAtendimento = ua.idUnidadeDeAtendimento
    AND MONTH(la.horarioDaAcao) = MONTH(NOW())
	AND YEAR(la.horarioDaAcao) = YEAR(NOW())
GROUP BY ua.idUnidadeDeAtendimento, ua.nomeFantasia
ORDER BY Chamados DESC
LIMIT 3;
    
    `

    return database.executar(instrucaoSql)

}
module.exports = {
  empresasCadastradas,
  quantidadeUsuarios,
  percentual,
  usuariosDia,
  chamados,
  rankingAlertas,
  rankingChamados
};