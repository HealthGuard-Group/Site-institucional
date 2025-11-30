// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var ClientGeminai = require("./src/recomendacaoIA");
var enviarEmail = require("./src/enviarEmail");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var aquariosRouter = require("./src/routes/aquarios");
var empresasRouter = require("./src/routes/empresas");
var dashboardRouter = require("./src/routes/dashboard");
var convitesRouter = require("./src/routes/convites");
var funcionariosRouter = require("./src/routes/funcionarios");
var graficoRouter = require("./src/routes/grafico");
var analiseramRouter = require("./src/routes/analiseram");
var analisecpuRouter = require("./src/routes/analisecpu");
var dashhgRouter = require("./src/routes/dashhg");
var acessosRouter = require("./src/routes/acessos");
var alertasgeralRouter = require("./src/routes/alertasgeral");
var alertasindividualRouter = require("./src/routes/alertasindividual");
var dashAlertasSemanaisRouter = require("./src/routes/dashAlertasSemanais");
var logAcoesRouter = require("./src/routes/logAcoes");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/aquarios", aquariosRouter);
app.use("/empresas", empresasRouter);
app.use("/dashboard", dashboardRouter);
app.use("/convites", convitesRouter);
app.use("/funcionarios", funcionariosRouter);
app.use("/grafico", graficoRouter);
app.use("/analiseram", analiseramRouter)
app.use("/analisecpu", analisecpuRouter )
app.use("/dashhg", dashhgRouter);
app.use("/acessos", acessosRouter)
app.use("/alertasgeral", alertasgeralRouter)
app.use("/alertasindividual", alertasindividualRouter)
app.use("/dashAlertasSemanais", dashAlertasSemanaisRouter);
app.use("/logacoes", logAcoesRouter);


app.post('/enviar-email', async (req, res) => {
    var email = req.body.email
    var assunto = req.body.assunto
    var mensagem = req.body.mensagem

    if (email == undefined) {
        res.status(400).send("email está undefined!");
    } else if (assunto == undefined) {
        res.status(400).send("assunto está undefined!");
    } else if (mensagem == undefined) {
        res.status(400).send("mensagem está undefined!");
    } else {
        const resultado = await enviarEmail(mensagem, email, assunto);

        if (resultado.sucesso) {
            res.status(200).send(resultado.mensagem);
        } else {
            res.status(500).send(resultado.mensagem);
        }
    }
});

app.post('/ia/perguntar', async (req, res) => {
    var mensagem = req.body.mensagem;

    if (mensagem == undefined) {
        res.status(400).send("mensagem está undefined!");
    } else {
        console.log("Perguntando para a IA:", mensagem);

        try {
            const respostaDaIA = await ClientGeminai(mensagem);

            res.json({ resposta: respostaDaIA });

        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: "Erro interno na IA" });
        }
    }
});


app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
