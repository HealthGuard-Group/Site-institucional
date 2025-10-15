var fkUnidade = undefined
var fkUsuario = undefined
var nomeUsuario = undefined
var permissao = undefined
var fkLogAcesso = undefined
var fkDac = undefined

window.addEventListener("beforeunload", () => {
    sessionStorage.FK_UNIDADE = fkUnidade
    sessionStorage.ID_USUARIO = fkUsuario
    sessionStorage.NOME_USUARIO = nomeUsuario
    sessionStorage.ID_PERMISSAO = permissao
    sessionStorage.ID_LOGACESSO = fkLogAcesso
    sessionStorage.ID_DAC = fkDac
});

function validarSessao() {
    window.addEventListener("load", () => {
        fkUnidade = sessionStorage.FK_UNIDADE;
        fkUsuario = sessionStorage.ID_USUARIO;
        nomeUsuario = sessionStorage.NOME_USUARIO;
        permissao = sessionStorage.ID_PERMISSAO;
        fkLogAcesso = sessionStorage.ID_LOGACESSO;
        fkDac = sessionStorage.ID_DAC
    });

    // Para não trocar tela sem sessão
    if (sessionStorage.FK_UNIDADE == undefined || sessionStorage.ID_PERMISSAO == undefined || sessionStorage.ID_USUARIO == undefined || sessionStorage.NOME_USUARIO == undefined) {
        window.location.href = "../index.html"
    }
    //
    fkUnidade = sessionStorage.FK_UNIDADE
    fkUsuario = sessionStorage.ID_USUARIO
    nomeUsuario = sessionStorage.NOME_USUARIO
    permissao = sessionStorage.ID_PERMISSAO
    fkDac = sessionStorage.ID_DAC
    // Trocando os valores da fkUnidade
    sessionStorage.FK_UNIDADE = null
    sessionStorage.ID_USUARIO = null
    sessionStorage.NOME_USUARIO = null
    sessionStorage.ID_PERMISSAO = null
    sessionStorage.ID_LOGACESSO = null
    sessionStorage.ID_DAC = null
    validacaoPermissao()
    fetch(`/dashboard/buscarLogAcesso/${fkUnidade}/${fkUsuario}`, {
        method: "GET",
    })
        .then(resposta => {
            return resposta.json();
        })
        .then(resposta => {
            fkLogAcesso = resposta[0].idLogAcesso
            if (window.location.href.includes("monitoramento.html")) {
                telaMonitoramento()
            }
        })
        .catch(function (resposta) {
            console.log(`Erro no catch: ${resposta}`);
        });

}
function telaMonitoramento() {
    trocarNomeUnidade()
    atualizarkpismonitoramento()
    atualizarMaquinas()
    var tempo_atualizacao_dados = 10 * 1000
    var loop = setInterval(() => {
        atualizarkpismonitoramento()
        atualizarMaquinas()
    }, tempo_atualizacao_dados)
    document.getElementById("filtro_maquinas").addEventListener('change', () => {
        atualizarMaquinas()
    })
}