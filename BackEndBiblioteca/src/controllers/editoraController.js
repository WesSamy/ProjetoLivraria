import express, { request, response } from "express";
import editora from "../entities/editora.js";
import { AppDataSource } from "../database/data-source.js";
import {Like, IsNull} from "typeorm";

const route = express.Router();
const repositorioEditora = AppDataSource.getRepository(editora);

route.get("/", async (request, response) => {
    const editoras = await repositorioEditora.findBy({deletedAt: IsNull()});
    return response.status(200).send({"response": editoras});
});

route.get("/:foundNome", async (request, response) => {
     const {foundNome} = request.params;
     const foundEditora = await repositorioEditora.findBy({nome_editora: Like (`%${foundNome}`)});
     return response.status(200).send({"response": foundEditora});
});

route.post("/", async (request, response) => {
    const {nome_editora, cnpj, email} = request.body;
 
    if(nome_editora.length < 1) {
     return response.status(400).send({"response": "Campo 'nome_editora' deve ter pelo menos um caractere."});
    }
    
    if(cnpj.length != 18){
         return response.status(400).send({"response": "O cnpj deve conter 18 caracteres."});
    }

    if(!email.includes("@")){
         return response.status(400).send({"response": "Campo 'email' está no padrão incorreto."});
    }


    try {
      const NovaEditora = repositorioEditora.create({nome_editora, cnpj, email});
      await repositorioEditora.save(NovaEditora);
      return response.status(201).send("Editora cadastrada com sucesso.");
    } catch(err) {
      return response.status(500).send({"response": err});
    }
});

route.put("/:id", async(request, response) => {
     const {nome_editora, cnpj, email} = request.body;
     const {id} = request.params;

     if(isNaN(id)) {
          return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
     }

     if(nome_editora.length < 1) {
          return response.status(400).send({"response": "Campo 'nome_editora' deve ter pelo menos um caractere."});
     }
    
     if(cnpj.length != 18){
          return response.status(400).send({"response": "O cnpj deve conter 18 caracteres."});
     }

     if(!email.includes("@")){
          return response.status(400).send({"response": "Campo 'email' está no padrão incorreto."});
     }

     try {
         await repositorioEditora.update({id}, {nome_editora, cnpj, email});
         return response.status(200).send({"response": "Editora atualizada com sucesso."});
     } catch(err) {
          return response.status(500).send({"response": err});
     }
});

route.delete("/:id", async(request, response) => {
     const {id} = request.params;

     if (isNaN(id)) {
          return response.status(400).send({"response": "O 'id' deve ser um número."});
     }

     try {
          await repositorioEditora.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});
          return response.status(200).send({"response": "Editora deletada com sucesso."});
     } catch(err) {
          return response.status(500).send({"response": err});
     }
});
 
export default route;