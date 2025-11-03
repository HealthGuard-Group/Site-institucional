var database = require("../database/config");

function criarconvite(fkUnidade,codigo,data,permissao) {
  var instrucaoSql = `INSERT INTO CodigoValidacaoUsuario(fkUnidadeDeAtendimento,fkPermissoes,codigo,dataExpiracao) VALUES (${fkUnidade},${permissao},"${codigo}","${data}")`;

  return database.executar(instrucaoSql);
}

module.exports = {
    criarconvite
};