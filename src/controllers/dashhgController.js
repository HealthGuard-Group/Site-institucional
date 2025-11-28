var dashboardHGModel = require("../models/dashhgModel");


function empresasCadastradas(req, res){
dashboardHGModel.empresasCadastradas()
      .then(
        function (resultado) {
          
          res.status(200).json(resultado)
        }
      ).catch(
        function (erro) {
          console.log(erro)
          console.log(
            "\nHouve um erro ao inserir log! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage)
        }
      );
    }


function quantidadeUsuarios(req, res){
dashboardHGModel.quantidadeUsuarios()
      .then(
        function (resultado) {
          
          res.status(200).json(resultado)
        }
      ).catch(
        function (erro) {
          console.log(erro)
          console.log(
            "\nHouve um erro ao inserir log! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage)
        }
      );
    }

function percentual(req, res){
dashboardHGModel.percentual()
      .then(
        function (resultado) {
          
          res.status(200).json(resultado)
        }
      ).catch(
        function (erro) {
          console.log(erro)
          console.log(
            "\nHouve um erro ao inserir log! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage)
        }
      );
    }

function usuariosDia(req, res){
dashboardHGModel.usuariosDia()
      .then(
        function (resultado) {
          
          res.status(200).json(resultado)
        }
      ).catch(
        function (erro) {
          console.log(erro);
          console.log(
            "\nHouve um erro ao inserir log! Erro: ",
            erro.sqlMessage
          );
          res.status(500).json(erro.sqlMessage)
        }
      );
    }
module.exports = {
  empresasCadastradas,
  quantidadeUsuarios,
  percentual,
  usuariosDia
}