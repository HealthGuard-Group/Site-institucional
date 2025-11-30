var fkUnidade = undefined
var fkUsuario = undefined
var nomeUsuario = undefined
var permissao = undefined
var fkLogAcesso = undefined
// var fkDac = undefined

window.addEventListener("beforeunload", () => {
sessionStorage.FK_UNIDADE = fkUnidade
sessionStorage.ID_USUARIO = fkUsuario
sessionStorage.NOME_USUARIO = nomeUsuario
sessionStorage.ID_PERMISSAO = permissao
sessionStorage.ID_LOGACESSO = fkLogAcesso
// sessionStorage.ID_DAC = fkDac
});

function validarSessao() {
window.addEventListener("load", () => {
    fkUnidade = sessionStorage.FK_UNIDADE;
    fkUsuario = sessionStorage.ID_USUARIO;
    nomeUsuario = sessionStorage.NOME_USUARIO;
    permissao = sessionStorage.ID_PERMISSAO;
    fkLogAcesso = sessionStorage.ID_LOGACESSO;
    //fkDac = sessionStorage.ID_DAC
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
// fkDac = sessionStorage.ID_DAC
// Trocando os valores da fkUnidade
sessionStorage.FK_UNIDADE = null
sessionStorage.ID_USUARIO = null
sessionStorage.NOME_USUARIO = null
sessionStorage.ID_PERMISSAO = null
sessionStorage.ID_LOGACESSO = null
// sessionStorage.ID_DAC = null
nome_usuario.innerHTML = nomeUsuario
validacaoPermissao()
fetch(`/dashboard/buscarLogAcesso/${fkUnidade}/${fkUsuario}`, {
    method: "GET",
})
    .then(resposta => {
        return resposta.json();
    })
    .then(resposta => {
        fkLogAcesso = resposta[0].idLogAcesso
        puxarUnidade()
        if (window.location.href.includes("monitoramento.html")) {
            telaMonitoramento()
        }
        if (window.location.href.includes("convites.html")) {
            puxarConvites()
        }
        if (window.location.href.includes("funcionarios.html")) {
            puxarFuncionarios()
        }
        if (window.location.href.includes("telaPerfil.html")){
            atualizarDados()
        }
        if (window.location.href.includes("analiseRAM.html")) {
            telaAnaliseRam()
        }
        if (window.location.href.includes("acessos.html")){
            buscarDadosLogs()
        }
        if (window.location.href.includes("grafico1.html")) {
            telaGrafico1()
        }
        if (window.location.href.includes("alertasGerais.html")){
            puxarAlertasGeral()
        }
        if (window.location.href.includes("alertasIndividuais.html")){
            puxarAlertasIndividual()
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
function puxarVariaveis() {
let variaveis = {
    idUsuario: fkUsuario,
    idLogAcesso: fkLogAcesso,
    idUnidadeAtendimento: fkUnidade,
    nomeUsuario: nomeUsuario,
    permissao: permissao,
    // idDac: fkDac
}
return variaveis
}
function inserirAcao(descricaoDaAcao) {
fetch("/usuarios/inseriracao", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        idUnidade: fkUnidade,
        idUsuario: fkUsuario,
        idLogAcesso: fkLogAcesso,
        acao: descricaoDaAcao
    }),
})
    .then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
        } else {
            throw "Não foi possível mandar os dados para o banco";
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        alert("Erro no catch");
    });
}
function telaAnaliseRam() {
    puxarNomeDaMaquina()
    puxandoMetricasAlertaDeRam(fkUnidade)
    atualizarKpisRAM()
    puxandoDadosGraficoRamSwap()
    puxarRankingRAM()
    puxandoKpiStress()
    atualizarTextoIA()
    var loop = setInterval(() => {
        atualizarKpisRAM()
        puxandoKpiStress()
        atualizarGraficoRam()
        puxarRankingRAM()
    },5000)
}
function telaGrafico1() {
    trocarMonitoramento()
    trocarGraficos()
    var loop = setInterval(() => {
        atualizarGraficoMonitoramento()
    },5000)
}


function puxarUnidade() {
fetch(`/dashboard/puxarNome/${fkUnidade}`, {
    method: "GET",
})
    .then(resposta => {
        return resposta.json();
    })
    .then(resposta => {

        console.log( "NOME UNIDADE: " + resposta[0].razaoSocial)
        sessionStorage.NOME_UNIDADE = resposta[0].razaoSocial
    })

}