document.querySelector('.menu-lateral').addEventListener('mouseover', () => {
    const texto_icone = document.querySelectorAll('.texto-icone')
    const box_icone = document.querySelectorAll('.icone-box')
    const box_icone_inferior = document.querySelectorAll('.icone-box-inferior')
    texto_icone.forEach(a => {
        a.classList.remove('oculto')
    })
    box_icone.forEach(a => {
        a.classList.add('extendido')
    })
    box_icone_inferior.forEach(a => {
        a.classList.add('extendido')
    })
    logo.innerHTML = `<img src="../assets/imgs/HealthGuard_Logomarca_BRANCA_fundo_transparente.png" alt="HealthGuard"
                    class="icone-logomarca">`

})
document.querySelector('.menu-lateral').addEventListener('mouseleave', () => {
    const texto_icone = document.querySelectorAll('.texto-icone')
    const box_icone = document.querySelectorAll('.icone-box')
    const box_icone_inferior = document.querySelectorAll('.icone-box-inferior')
    texto_icone.forEach(a => {
        a.classList.add('oculto')
    })
    box_icone.forEach(a => {
        a.classList.remove('extendido')
    })
    box_icone_inferior.forEach(a => {
        a.classList.remove('extendido')
    })
    logo.innerHTML = `<img src="../assets/imgs/HealthGuard_icone_BRANCO_fundo_transparente.png"" alt="HealthGuard"
                        class="icone-logo-pequena">`
})
// Redirecionamento para o monitoramento
document.getElementById("monitoramento_redirecionamento").addEventListener('click', () => {
    window.location.href = "monitoramento.html"
})
document.getElementById("sair_conta_redirecionamento").addEventListener('click', () => {
    sessionStorage.clear()
    window.location.href = "../index.html"
})
function validacaoPermissao() {
    if(permissao == "2"){
        document.getElementById("gestao_redirecionamento").classList.add("oculto")
        document.querySelector('.separador').classList.add("oculto")
    }
    // Expulsar usuário tela de gestão usuários
}