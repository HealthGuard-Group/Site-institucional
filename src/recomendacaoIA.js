var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function ClientGeminai(mensagemUsuario) {

  // Verifica se tem mensagem
  if (!mensagemUsuario) {
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.CHAVE_API_GEMINAI);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(mensagemUsuario);
    const response = await result.response;
    const texto = response.text();

    return texto;
  } catch (erro) {
    console.error("Erro interno do Gemini:", erro);
    return "Erro ao tentar contatar a IA.";
  }
}

module.exports = ClientGeminai;