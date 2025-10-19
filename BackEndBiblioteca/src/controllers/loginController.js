import express, { request, response } from "express";
import usuario from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import {IsNull} from "typeorm";
import { generateToken } from "../utils/jwt.js";
import { GerandoNovaSenha } from "../utils/login.js";
import { sendMail } from "../helpers/nodemailer.js";

const route = express.Router();
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.post("/", async (request, response) => {
    const {email, password} = request.body;

    if(!email.includes("@")) {
        return response.status(400).send({"response": "O email informado é inválido."});
    }

    if(password.length < 6) {
        return response.status(400).send({"response": "A senha deve conter pelo menos 6 caracteres."});
    }

    const user = await repositorioUsuario.findOneBy({
        email, password, deletedAt: IsNull()
    });

    if(!user) {
        return response.status(401).send({"response": "Usuário ou senha inválido."});
    }

    const token = generateToken({user: user.name, email: user.email, typeUser: user.typeUser});

    return response.status(200).send({"response": "Login efetuado com sucesso.", token});
});

route.put("/reset", async (request, response) => {
    const {email} = request.body;

    const user = await repositorioUsuario.findOneBy({email, deletedAt: IsNull()});

    if(!user) {
        return response.status(400).send({"response": "Email inválido."})
    }

    const novaSenha = GerandoNovaSenha();

    await repositorioUsuario.update({email}, {password: novaSenha});

    sendMail(novaSenha, user.email);

    return response.status(200).send({"response": "Senha enviada para o email."});
});

export default route;