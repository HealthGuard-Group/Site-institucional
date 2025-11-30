var nodemailer = require("nodemailer");
require("dotenv").config();

async function enviarEmail(mensagem,emailDestinario,assunto) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.SENHA 
        }
    });

    const email = {
        from: `"HealthGuard" <contatohealthguard@gmail.com>`,
        to: `${emailDestinario}`,
        subject: `${assunto}`,

        html: `
            ${mensagem}
        `
    };

    try {
        await transporter.sendMail(email);

        return {
            sucesso: true,
            mensagem: "O email foi enviado com sucesso!"
        }

    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        return {
            sucesso: false,
            mensagem: `Houve um erro ao enviar o email. Segue o erro: ${error}`
        }
    }
}

module.exports = enviarEmail;