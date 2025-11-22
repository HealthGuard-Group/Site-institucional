var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        res.status(200).json(resultadoAutenticar[0]);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválidos!");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login!");
                    }


                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cpf = req.body.cpfServer
    var codigo = req.body.codigoServer


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu CPF está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Seu codigo de validação está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, cpf, codigo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function inseriracao(req, res) {
    var idUnidade = req.body.idUnidade
    var idUsuario = req.body.idUsuario;
    var idLogAcesso = req.body.idLogAcesso;
    var acao = req.body.acao

    if (idUnidade == undefined) {
        res.status(400).send("Seu idUnidade está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (idLogAcesso == undefined) {
        res.status(400).send("Sua idLogAcesso está undefined!");
    } else if (acao == undefined) {
        res.status(400).send("Seu acao está undefined!");
    } else {
        usuarioModel.inseriracao(idUnidade, idUsuario, idLogAcesso, acao)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o inserir o log de ação! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function buscarconvite(req, res) {
    var codigo = req.params.codigo

    if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else {
        usuarioModel.buscarconvite(codigo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a busca do convite! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function verificarUsuario(req, res) {
    var email = req.params.email

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        usuarioModel.verificarUsuario(email)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a busca do usuario! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function atualizarcodigorecuperacao(req, res) {
    var codigo = req.body.codigo
    var fkpermissoes = req.body.fkpermissoes
    var idUsuario = req.body.idUsuario

    if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else if (fkpermissoes == undefined) {
        res.status(400).send("Seu fkpermissoes está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.atualizarcodigorecuperacao(codigo, fkpermissoes, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar ao atualizar o seu código de recuperação de senha! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function inserircodigorecuperacao(req, res) {
    var codigo = req.body.codigo
    var fkpermissoes = req.body.fkpermissoes
    var idUsuario = req.body.idUsuario

    if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else if (fkpermissoes == undefined) {
        res.status(400).send("Seu fkpermissoes está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.inserircodigorecuperacao(codigo, fkpermissoes, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar ao inserir o seu código de recuperação de senha! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function verificarCodigo(req, res) {
    var codigo = req.params.codigo

    if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else {
        usuarioModel.verificarCodigo(codigo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a busca do código! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function atualizarsenha(req, res) {
    var senha = req.body.senha
    var idUsuario = req.body.idUsuario

    if (senha == undefined) {
        res.status(400).send("Seu senha está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else {
        usuarioModel.atualizarsenha(senha, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualizar a senha! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function puxardadosuser(req, res) {
    var id = req.params.id

    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    }  else {
        usuarioModel.puxardadosuser(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a atualizar a senha! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function updatedados(req, res) {
    var idUsuario = req.body.idUsuario
    var nome = req.body.nome
    var email = req.body.email
    var cpf = req.body.cpf

    if (idUsuario == undefined) {
        res.status(400).send("Seu idUsuario está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else  {
        usuarioModel.updatedados(idUsuario, nome, email, cpf)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao atualizar os dados! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluir_conta(req, res) {
    var idUsuario = req.params.idUsuario;

    usuarioModel.excluir_conta(idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o usuario: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
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
    excluir_conta
}