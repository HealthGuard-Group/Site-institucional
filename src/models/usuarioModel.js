var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `SELECT
    u.idUsuario,
    u.nome AS nomeUsuario,
    p.idPermissoes,
    (
        SELECT fkUnidadeDeAtendimento
        FROM CodigoValidacaoUsuario cv
        WHERE cv.fkPermissoes = p.idPermissoes
          AND cv.statusCodigoValidacaoUsuario = 'Aceito'
          AND cv.dataExpiracao >= NOW()
        ORDER BY cv.idCodigoValidacao DESC
        LIMIT 1
    ) AS fkUnidadeDeAtendimento,
    (
        SELECT idLogAcesso
        FROM LogAcesso la
        WHERE la.fkUsuario = u.idUsuario
        ORDER BY la.idLogAcesso DESC
        LIMIT 1
    ) AS idLogAcesso
FROM Usuario u
JOIN Permissoes p 
    ON u.fkPermissoes = p.idPermissoes
WHERE u.email = '${email}'
  AND u.senha = sha2('${senha}',256);;
    ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql)
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, cpf, codigo) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf, codigo);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.

    var consultaPermissao = `
        SELECT fkUnidadeDeAtendimento, fkPermissoes
        FROM CodigoValidacaoUsuario
        WHERE codigo like '${codigo}'
        AND dataExpiracao >= NOW()
        AND statusCodigoValidacaoUsuario like 'Pendente';  
    `
        ;

    return database.executar(consultaPermissao)
        .then(resultado => {
            console.log("Resultado do SELECT:", resultado);

            if (resultado.length > 0) {
                var fkPermissoes = resultado[0].fkPermissoes;
                var fkUnidadeDeAtendimento = resultado[0].fkUnidadeDeAtendimento;

                var inserirUsuario = `
                    INSERT INTO Usuario (nome, email, senha, cpf, fkPermissoes)
                    VALUES ('${nome}', '${email}', sha2('${senha}',256), '${cpf}', ${fkPermissoes});
                `;

                console.log("Executando a instrução SQL: \n" + inserirUsuario);

                return database.executar(inserirUsuario)
                    .then(() => {
                        var pegarIdUsuario = `
                            SELECT idUsuario FROM Usuario WHERE email = '${email}';
                        `;
                        return database.executar(pegarIdUsuario);
                    })
                    .then(resultadoUsuario => {
                        var idUsuario = resultadoUsuario[0].idUsuario;

                        var inserirLogAcesso = `
                            INSERT INTO LogAcesso (fkUnidadeDeAtendimento, fkUsuario)
                            VALUES (${fkUnidadeDeAtendimento}, ${idUsuario});
                        `;
                        console.log("Executando o Log de acesso:\n" + inserirLogAcesso);

                        return database.executar(inserirLogAcesso)
                            .then(() => {
                                var pegarIdLog = `
                                SELECT idLogAcesso FROM LogAcesso 
                                WHERE fkUsuario = ${idUsuario}
                                ORDER BY idLogAcesso DESC LIMIT 1;
                            `;
                                return database.executar(pegarIdLog);
                            })
                            .then(resultadoLog => {
                                var idLogAcesso = resultadoLog[0].idLogAcesso;

                                var inserirLogAcoes = `
                                INSERT INTO LogAcoes (fkUnidadeAtendimento, fkUsuario, fkLogAceso, acao, statusAcao)
                                VALUES (${fkUnidadeDeAtendimento}, ${idUsuario}, ${idLogAcesso}, 'Criando Conta', 'Sucesso');
                            `;
                                console.log("Executando LogAcoes:\n" + inserirLogAcoes);

                                return database.executar(inserirLogAcoes);
                            })
                            .then(() => {
                                var atualizarCodigo = `
                                UPDATE CodigoValidacaoUsuario
                                SET statusCodigoValidacaoUsuario = 'Aceito'
                                WHERE codigo = '${codigo}';
                            `;
                                console.log("Atualizando status do código...");
                                return database.executar(atualizarCodigo);
                            });
                    });
            } else {
                throw new Error("Código inválido ou expirado. Não foi possível cadastrar o usuário.");
            }
        })
        .catch(erro => {
            console.error("Erro ao cadastrar usuário:", erro);
            throw erro;
        });
}
function inseriracao(idUnidade, idUsuario, idLogAcesso, acao) {
    var instrucaoSql = ``;
    if (acao) {
        instrucaoSql = `INSERT INTO LogAcoes(fkUnidadeAtendimento,fkLogAceso,fkUsuario,acao,statusAcao) 
  VALUES (${idUnidade},${idLogAcesso},"${idUsuario}","${acao}","Sucesso")`;
    } else {
        instrucaoSql = `INSERT INTO LogAcoes(fkUnidadeAtendimento,fkLogAceso,fkUsuario,acao,statusAcao) 
  VALUES (${idUnidade},${idLogAcesso},"${idUsuario}","${acao}","Falha")`;
    }

    return database.executar(instrucaoSql);
}
function buscarconvite(codigo) {
    var instrucaoSql = `SELECT nomeSugerido,emailSugerido FROM CodigoValidacaoUsuario WHERE codigo = '${codigo}' AND statusCodigoValidacaoUsuario = 'Pendente'`;

    return database.executar(instrucaoSql);
}
function verificarUsuario(email) {
    var instrucaoSql = `SELECT idUsuario,nome,email,fkpermissoes FROM Usuario WHERE email = '${email}'`;

    return database.executar(instrucaoSql);
}
function atualizarcodigorecuperacao(codigo, fkpermissoes, idUsuario) {
    var instrucaoSql = `UPDATE CodigoRecuperacaoSenha SET codigo = '${codigo}', dataCriacao = default WHERE fkUsuario = '${idUsuario}' AND fkPermissoes = ${fkpermissoes}`;

    return database.executar(instrucaoSql);
}
function inserircodigorecuperacao(codigo, fkpermissoes, idUsuario) {
    var instrucaoSql = `INSERT INTO CodigoRecuperacaoSenha VALUES
(DEFAULT,'${fkpermissoes}','${idUsuario}',"${codigo}",DEFAULT);`;

    return database.executar(instrucaoSql);
}
function verificarCodigo(codigo) {
    var instrucaoSql = `select * FROM CodigoRecuperacaoSenha WHERE datacriacao >= (now() - INTERVAL 20 MINUTE) AND codigo = '${codigo}';`;

    return database.executar(instrucaoSql);
}
function atualizarsenha(senha, idUsuario) {
    var instrucaoSql = `UPDATE Usuario SET senha = sha2('${senha}',256) WHERE idUsuario = '${idUsuario}'`;

    return database.executar(instrucaoSql);
}

function puxardadosuser(id) {
    var instrucaoSql = `select * from Usuario where idUsuario = ${id} `;
    return database.executar(instrucaoSql);


}
function updatedados(idUsuario, nome, email, cpf) {
    var instrucaoSql = `update Usuario set nome = '${nome}',email = '${email}', cpf = '${cpf}' where idUsuario = ${idUsuario} ; `
    return database.executar(instrucaoSql);
}
function excluir_conta(idUsuario) {
    var instrucaoSql = `Delete from Usuario where idUsuario = ${idUsuario}; `
    return database.executar(instrucaoSql);
}

function validacaosenha(email, senha) {
    console.log('select')
    var instrucaoSql = `select idUsuario from Usuario where email = '${email}'and senha = sha2('${senha}' ,256) limit 1;    `;
    return database.executar(instrucaoSql);


}

module.exports = {
    autenticar,
    cadastrar,
    inseriracao,
    buscarconvite,
    verificarUsuario,
    atualizarcodigorecuperacao,
    inserircodigorecuperacao,
    verificarCodigo,
    atualizarsenha,
    puxardadosuser,
    updatedados,
    excluir_conta,
    validacaosenha
};