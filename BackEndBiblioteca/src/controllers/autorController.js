import express, { request, response } from "express";
import autor from "../entities/autor.js";
import { AppDataSource } from "../database/data-source.js";
import {IsNull, Like} from "typeorm";

const route = express.Router();
const repositorioAutor = AppDataSource.getRepository(autor);

route.get("/", async (request, response) => {
    const autores = await repositorioAutor.findBy({deletedAt: IsNull()});
    return response.status(200).send({"response": autores});
});

route.get("/:foundNome", async (request, response) => {
     const {foundNome} = request.params;
     const foundAuthor = await repositorioAutor.findBy({nome_autor: Like (`%${foundNome}`)});
     return response.status(200).send({"response": foundAuthor});
});

route.post("/", async (request, response) => {
   const {nome_autor, data_nascimento, nacionalidade} = request.body;

   if(nome_autor.length < 1) {
    return response.status(400).send({"response": "O nome do autor deve ter pelo menos um caractere."});
   }

   if(data_nascimento.length != 8) {
     return response.status(400).send({"response": "Campo 'data_nascimento' deve ser uma data e/ou número."});
   }

   if(nacionalidade == 'number') {
    return response.status(400).send({"response": "A 'nacionalidade' deve ser válida."});
   }


   try {
     const NovoAutor = repositorioAutor.create({nome_autor, data_nascimento, nacionalidade});
     await repositorioAutor.save(NovoAutor);
     return response.status(201).send("Autor cadastrado com sucesso.");
   } catch(err) {
     return response.status(500).send({"response": err});
   }
});

route.put("/:id", async (request, response) => {
    const {nome_autor, data_nascimento, nacionalidade} = request.body;
    const {id} = request.params;

    if(isNaN(id)) {
      return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }
    
    if(nome_autor.length < 1) {
      return response.status(400).send({"response": "O nome do autor deve ter pelo menos um caractere."});
    }

    if(data_nascimento.length != 8) {
      return response.status(400).send({"response": "Campo 'data_nascimento' deve ser uma data"});
    }

    if(nacionalidade == 'number') {
      return response.status(400).send({"response": "A 'nacionalidade' deve ser válida."});
    }

    try {
      await repositorioAutor.update({id}, {nome_autor, data_nascimento, nacionalidade});
      return response.status(200).send({"response": "Autor atualizado com sucesso."});
    } catch(err) {
      return response.status(500).send({"response": err})
    }
});

route.delete("/:id", async (request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
      return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }

    try {
        await repositorioAutor.update({id}, {deletedAt:() => "CURRENT_TIMESTAMP"});
        return response.status(200).send({"response": "Autor deletado com sucesso."});
     } catch(err) {
        return response.status(500).send({"response": err});
     }
});

export default route;