var database = require("../database/config");

function criarconvite(fkUnidade, codigo, data, permissao, nome, email) {
  var instrucaoSql = `INSERT INTO CodigoValidacaoUsuario(fkUnidadeDeAtendimento,fkPermissoes,codigo,dataExpiracao,emailSugerido,nomeSugerido) VALUES (${fkUnidade},${permissao},"${codigo}","${data}","${email}","${nome}")`;

  return database.executar(instrucaoSql);
}
function buscarconvites(fkUnidade) {
  var instrucaoSql = `SELECT * FROM CodigoValidacaoUsuario WHERE fkUnidadeDeAtendimento = ${fkUnidade} ORDER BY idCodigoValidacao DESC`;

  return database.executar(instrucaoSql);
}
function validarconvite(emailVar) {
  var instrucaoSql = `SELECT * FROM CodigoValidacaoUsuario WHERE emailSugerido = "${emailVar}" AND statusCodigoValidacaoUsuario = "Pendente"`;

  return database.executar(instrucaoSql);
}
function revogarconvites(id) {
  var instrucaoSql = `UPDATE CodigoValidacaoUsuario SET statusCodigoValidacaoUsuario = "Revogado" WHERE idCodigoValidacao = "${id}"`;

  return database.executar(instrucaoSql);
}

module.exports = {
    criarconvite,
    buscarconvites,
    validarconvite,
    revogarconvites
};