var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a empresa com o cnpj ${cnpj} já existe` });
    } else {
      empresaModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
}

function InserirLogAcesso(req, res) {
  var fkUsuario = req.body.fkUsuario;
  var fkUnidadeDeAtendimento = req.body.fkUnidadeDeAtendimento;
  console.log("Entrei no Fetch do Log")
  console.log("Id Usuário na controller:", fkUsuario)
  console.log("Id Unidade na controller:", fkUnidadeDeAtendimento)

  if (fkUsuario == undefined) {
    res.status(400).send("Seu fkUsuario está undefined!");
  }
  else if (fkUnidadeDeAtendimento == undefined) {
    res.status(400).send("Seu fkUnidadeDeAtendimento está undefined!");
  } else {

    empresaModel.InserirLogAcesso(fkUsuario, fkUnidadeDeAtendimento)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao inserir log! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
  InserirLogAcesso
};
