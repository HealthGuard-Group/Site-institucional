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

function totalMaquinas(){
    var totalMaquinasSql = 
    ` select count(idDac) from Dac;`;
    return database.executar(totalMaquinasSql)
}

function usuariosDia(){
    var usuariosDiasSql = 
    ` select 
    date(horarioDaAcao) as dia,
    count('Realizando Login') as quantidade_acessos
    from LogAcoes
    where horarioDaAcao >= now() - interval 7 day
    group by date(horarioDaAcao)
    order by dia;`;
    return database.executar(usuariosDiasSql)
}
module.exports = {
  empresasCadastradas,
  quantidadeUsuarios,
  totalMaquinas,
  usuariosDia
};