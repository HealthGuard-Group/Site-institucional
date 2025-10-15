var dashboardModel = require("../models/dashboardModel");

function buscarLogAcesso(req, res) {
  var fkUnidade = req.params.fkUnidade;
  var fkUsuario = req.params.fkUsuario;

  if (fkUnidade == undefined) {
    res.status(400).send("Seu fkUnidade está undefined!");
  }
  else if (fkUsuario == undefined) {
    res.status(400).send("Seu fkUsuario está undefined!");
  } else {

    dashboardModel.buscarLogAcesso(fkUnidade, fkUsuario)
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
function buscarNomeDaUnidade(req, res) {
  var fkUnidade = req.params.fkUnidade;
  if (fkUnidade == undefined) {
    res.status(400).send("Seu fkUnidade está undefined!");
  } else {

    dashboardModel.buscarNomeDaUnidade(fkUnidade)
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
function buscarMaquina(req, res) {
  var fkUnidade = req.params.fkUnidade;
  if (fkUnidade == undefined) {
    res.status(400).send("Seu fkUnidade está undefined!");
  } else {

    dashboardModel.buscarMaquina(fkUnidade)
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
function buscarKpisMonitoramento(req, res) {
  var fkUnidade = req.params.fkUnidade;
  if (fkUnidade == undefined) {
    res.status(400).send("Seu fkUnidade está undefined!");
  } else {

    dashboardModel.buscarKpisMonitoramento(fkUnidade)
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
  buscarLogAcesso,
  buscarNomeDaUnidade,
  buscarMaquina,
  buscarKpisMonitoramento
}