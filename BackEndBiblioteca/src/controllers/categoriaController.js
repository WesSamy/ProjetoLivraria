import express, { request, response } from "express";
import categoria from "../entities/categoria.js";
import { AppDataSource } from "../database/data-source.js";
import {Like, IsNull} from "typeorm";

const route = express.Router();
const repositorioCategoria = AppDataSource.getRepository(categoria);

route.get("/", async (request, response) => {
    const categorias = await repositorioCategoria.findBy({deletedAt: IsNull()});
    return response.status(200).send({"response": categorias});
});

route.get("/:foundNome", async (request, response) => {
     const {foundNome} = request.params;
     const foundCategory = await repositorioCategoria.findBy({nome_categoria: Like (`%${foundNome}`)});
     return response.status(200).send({"response": foundCategory});
});

route.post("/", async (request, response) => {
    const {nome_categoria} = request.body;
 
    if(nome_categoria.length < 1) {
     return response.status(400).send({"response": "O nome da categoria deve conter pelo menos um caractere."});
    }

    try {
      const NovaCategoria = repositorioCategoria.create({nome_categoria});
      await repositorioCategoria.save(NovaCategoria);
      return response.status(201).send("Categoria cadastrada com sucesso.");
    } catch(err) {
      return response.status(500).send({"response": err});
    }
});

route.put("/:id", async(request, response) => {
    const {nome_categoria} = request.body;
    const {id} = request.params;

    if(isNaN(id)) {
      return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }

    if(nome_categoria.length < 1) {
      return response.status(400).send({"response": "O nome da categoria deve conter pelo menos um caractere."});
    }

    try {
      await repositorioCategoria.update({id}, {nome_categoria});
      return response.status(200).send({"response": "Categoria foi atualizada com sucesso."});
    } catch(err) {
      return response.status(500).send({"response": err});
    }
});

route.delete("/:id", async(request, response) => {
    const {id} = request.params;

    if(isNaN(id)) {
      return response.status(400).send({"response": "O campo 'id' deve ser numérico."});
    }

    try {
      await repositorioCategoria.update({id}, {deletedAt: () => "CURRENT_TIMESTAMP"});
      return response.status(200).send({"response": "Categoria deletada com sucesso."});
    } catch(err) {
      return response.status(500).send({"response": err});
    }
});
 
export default route;