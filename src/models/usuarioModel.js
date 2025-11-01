var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `SELECT 
    u.idUsuario,
    u.nome AS nomeUsuario,
    p.idPermissoes,
    cv.fkUnidadeDeAtendimento
    FROM Usuario u
    JOIN Permissoes p 
    ON u.fkPermissoes = p.idPermissoes
    LEFT JOIN CodigoValidacaoUsuario cv 
    ON cv.fkPermissoes = p.idPermissoes
    LEFT JOIN LogAcesso la 
    ON la.fkUsuario = u.idUsuario
    WHERE u.email = '${email}' AND u.senha = sha2('${senha}',256)
    LIMIT 1
    ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
                                INSERT INTO LogAcoes (fkUnidadeAtendimento, fkUsuario, fkLogAceso, acao)
                                VALUES (${fkUnidadeDeAtendimento}, ${idUsuario}, ${idLogAcesso}, 'Criando Conta');
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

module.exports = {
    autenticar,
    cadastrar
};