var database = require("../database/config");

function criarconvite(fkUnidade, codigo, data, permissao, nome, email) {
  var instrucaoSql = `INSERT INTO CodigoValidacaoUsuario(fkUnidadeDeAtendimento,fkPermissoes,codigo,dataExpiracao,emailSugerido,nomeSugerido) VALUES (${fkUnidade},${permissao},"${codigo}","${data}","${email}","${nome}")`;

  return database.executar(instrucaoSql);
}

module.exports = {
    criarconvite
};