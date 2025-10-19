import nodemailer from 'nodemailer';
import fs from 'fs';

function sendMail(novaSenha, userEmail) {
    const transportador = nodemailer.createTransport({
       service: "gmail",
       auth: {
            user: "wetgthg@gmail.com",
            pass: "khmhcvwlcmkzghpm"
       }
    });

    let mailOptions = {
        from: 'rara.ul@gmail.com',
        to: userEmail,
        subject: 'Recuperação de Senha',
        html: getEmailTemplate(novaSenha)
    };

    transportador.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Erro ao enviar e-mail: ", error);
        } else {
            console.log("E-mail enviado: " + info.response);
        }
    });
    
}

const getEmailTemplate = (novaSenha) => {
    const htmlTemplate = fs.readFileSync("./src/templates/mudarSenha.html", 'utf-8');
    return htmlTemplate.replace('{{novaSenha}}', novaSenha);
}

export {sendMail};