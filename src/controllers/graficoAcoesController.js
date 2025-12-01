const kpisModel = require("../models/graficoAcoesModel");

module.exports = {
    listar(req, res) {
        const idUnidade = req.headers.unidade || 1;

        kpisModel.listarKpis(idUnidade)
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
    },

    carga(req, res) {
        const idUnidade = req.params.idUnidade;

        kpisModel.cargaTrabalho(idUnidade)
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
    },

    tipos(req, res) {
        const idUnidade = req.params.idUnidade;

        kpisModel.tiposAcao(idUnidade)
        .then(r => res.json(r[0]))
        .catch(e => res.status(500).json(e));
    },

    usuarios(req, res) {
        const idUnidade = req.params.idUnidade;

        kpisModel.usuariosAtivos(idUnidade)
        .then(r => res.json(r))
        .catch(e => res.status(500).json(e));
    }
};
