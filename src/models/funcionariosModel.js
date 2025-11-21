// const { atualizarpermissao } = require("../controllers/funcionariosController");
var database = require("../database/config");

function buscarfuncionarios(fkUnidade) {
  var instrucaoSql = `SELECT 
                          u.idUsuario,
                          u.nome AS nomeUsuario, 
                          u.email, 
                          u.cpf, 
                          p.nome AS permissao
                      FROM Usuario AS u 
                      JOIN Permissoes AS p  
                          ON p.idPermissoes = u.fkPermissoes
                      JOIN CodigoValidacaoUsuario AS codV
                          ON p.idPermissoes = codV.fkPermissoes
                      WHERE fkUnidadeDeAtendimento = ${fkUnidade}
                      GROUP BY u.idUsuario
                      ORDER BY u.idUsuario DESC;`;

  return database.executar(instrucaoSql);
}

function atualizarpermissao(idUsuario, fkPermissao) {
  var instrucaoSql = `UPDATE Usuario SET fkPermissoes = ${fkPermissao}
	                        WHERE idUsuario = ${idUsuario};`;

  return database.executar(instrucaoSql);
}
// function validarconvite(emailVar) {
//   var instrucaoSql = `SELECT * FROM CodigoValidacaoUsuario WHERE emailSugerido = "${emailVar}" AND statusCodigoValidacaoUsuario = "Pendente"`;

//   return database.executar(instrucaoSql);
// }
// function revogarconvites(id) {
//   var instrucaoSql = `UPDATE CodigoValidacaoUsuario SET statusCodigoValidacaoUsuario = "Revogado" WHERE idCodigoValidacao = "${id}"`;

//   return database.executar(instrucaoSql);
// }

module.exports = {
  buscarfuncionarios,
  atualizarpermissao
  // validarconvite,
  // revogarconvites
};