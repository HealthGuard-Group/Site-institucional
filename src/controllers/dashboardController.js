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
function buscarMetricasPadrao(req, res) {
  var fkUnidade = req.params.fkUnidade;
  if (fkUnidade == undefined) {
    res.status(400).send("Seu fkUnidade está undefined!");
  } else {

    dashboardModel.buscarMetricasPadrao(fkUnidade)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao puxar as métricas padrão! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}
function inserirmaquina(req, res) {
  var maquina_nova = req.body.maquina_nova;
  var idUnidadeAtendimento = req.body.idUnidadeAtendimento;
  if (maquina_nova == undefined) {
    res.status(400).send("Seu maquina_nova está undefined!");
  } else if (idUnidadeAtendimento == undefined) {
    res.status(400).send("Seu idUnidadeAtendimento está undefined!");
  } else {

    dashboardModel.inserirmaquina(maquina_nova, idUnidadeAtendimento)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao puxar as métricas padrão! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}
function inserirmaquinaservicos(req, res) {
  var maquina_nova = req.body.maquina_nova;
  var idUnidadeAtendimento = req.body.idUnidadeAtendimento;
  var idDac = req.body.idDac;
  if (maquina_nova == undefined) {
    res.status(400).send("Seu maquina_nova está undefined!");
  } else if (idUnidadeAtendimento == undefined) {
    res.status(400).send("Seu idUnidadeAtendimento está undefined!");
  } else if (idDac == undefined) {
    res.status(400).send("Seu idDac está undefined!");
  } else {

    dashboardModel.inserirmaquinaservicos(maquina_nova, idUnidadeAtendimento, idDac)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao puxar as métricas padrão! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage);
        }
      );
  }
}
function inserirmaquinametricaspersonalizadas(req, res) {
  var maquina_nova = req.body.maquina_nova;
  var idUnidadeAtendimento = req.body.idUnidadeAtendimento;
  var idDac = req.body.idDac;
  if (maquina_nova == undefined) {
    res.status(400).send("Seu maquina_nova está undefined!");
  } else if (idUnidadeAtendimento == undefined) {
    res.status(400).send("Seu idUnidadeAtendimento está undefined!");
  } else if (idDac == undefined) {
    res.status(400).send("Seu idDac está undefined!");
  } else {

    dashboardModel.inserirmaquinametricaspersonalizadas(maquina_nova, idUnidadeAtendimento, idDac)
      .then(
        function (resultado) {
          res.json(resultado);
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao puxar as métricas padrão! Erro: ",
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
  buscarKpisMonitoramento,
  buscarMetricasPadrao,
  inserirmaquina,
  inserirmaquinaservicos,
  inserirmaquinametricaspersonalizadas
}