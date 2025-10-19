import express, { request, response } from "express";
import usuario from "../entities/user.js";
import { AppDataSource } from "../database/data-source.js";
import {Like, IsNull} from "typeorm";
import { authenticate } from "../utils/jwt.js";

const route = express.Router();
const repositorioUsuario = AppDataSource.getRepository(usuario);

route.get("/", authenticate, async (request, response) => {
    const usuarios = await repositorioUsuario.findBy({deletedAt: IsNull()});
    return response.status(200).send({"response": usuarios});
});

route.get("/:foundNome", authenticate, async (request, response) => {
     const {foundNome} = request.params;
     const foundUser = await repositorioUsuario.findBy({name: Like (`%${foundNome}`)});
     return response.status(200).send({"response": foundUser});
});

route.post("/", async (request, response) => {
   const {name, email, password, typeUser} = request.body;

   if(name.length < 1) {
    return response.status(400).send({"response": "Campo 'name' deve ter pelo menos um caractere."});
   }

   if(!email.includes("@")){
        return response.status(400).send({"response": "Campo 'email' está no padrão incorreto."});
   }

   if(password.length < 6){
        return response.status(400).send({"response": "A senha deve conter pelo menos 6 caracteres."})
   }

   if(typeUser.toLowerCase() != "admin" && typeUser.toLowerCase() != "comum"){
        return response.status(400).send({"response": "O tipo de usuário deve ser 'admin' ou 'comum'."})
   }

   try {
     const NovoUser = repositorioUsuario.create({name, email, password, typeUser});
     await repositorioUsuario.save(NovoUser);
     return response.status(201).send("Usuário cadastrado com sucesso.");
   } catch(err) {
     return response.status(500).send({"response": err});
   }
});

route.put("/:id", async(request, response) => {
     const {name, email, password, typeUser} = request.body;
     const {id} = request.params;

     if(isNaN(id)) {
          return response.status(400).send({"response": "O campo 'id' deve ser númerico."});
     }

     if(name.length < 1) {
          return response.status(400).send({"response": "Campo 'name' deve ter pelo menos um caractere."});
     }
      
     if(!email.includes("@")){
          return response.status(400).send({"response": "Campo 'email' está no padrão incorreto."});
     }
     
     if(password.length < 6){
          return response.status(400).send({"response": "A senha deve conter pelo menos 6 caracteres."});
     }
     
     if(typeUser.toLowerCase() != "admin" && typeUser.toLowerCase() != "comum"){
          return response.status(400).send({"response": 'O tipo de usuário deve ser "admin" ou "comum".'});
     }

     try {
          await repositorioUsuario.update({id}, {name, email, password, typeUser});
          return response.status(200).send({"response": "Usuário atualizado com sucesso."});
     } catch(err) {
          return response.status(500).send({"response": err});
     }
});

route.delete("/:id", async(request, response) => {
     const {id} = request.params;

     if(isNaN(id)) {
          return response.status(400).send({"response": "O campo 'id' precisa ser númerico."});
     }
     
     try {
          await repositorioUsuario.update({id}, {deletedAt:() => "CURRENT_TIMESTAMP"});
          return response.status(200).send({"response": "Usuário deletado com sucesso."});
     } catch(err) {
          return response.status(500).send({"response": err});
     }
});

export default route;